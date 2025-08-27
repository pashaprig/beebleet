import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import React, { useEffect, useState, useRef } from "react";
import { FORMAT_EXTENSIONS, MAX_FILE_SIZE, MIN_DIMENSION, SUPPORTED_FORMATS } from '@/consts/consts';


interface ImageCroperProps {
  aspectRatio?: number;
  onRequestCrop?: () => void;
  onImageCropped?: (croppedImage: string | null) => void;
}

const ImageCroper = React.memo(function ImageCroper({ aspectRatio = 1, onRequestCrop, onImageCropped }: ImageCroperProps) {
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const imgRef = useRef<HTMLImageElement | null>(null);


  const processFile = (file: File) => {
    if (!file) return;    
    setFileName(file.name);
    
    // Check if file format is supported
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setFileName('');
      setError(`Unsupported file format. Please use ${FORMAT_EXTENSIONS}`);
      return;
    }
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileName('');
      setError(`File size exceeds ${MAX_FILE_SIZE} limit`);
      return;
    }

    const reader = new FileReader();
    
    reader.addEventListener("error", () => {
      setFileName('');
      setError('Error reading file. Please try again.');
    });
    
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result as string;
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (e) => {
        setError(null);
        const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setImageUrl('');
          setFileName('');
          setError(`Image must be at least ${MIN_DIMENSION}px × ${MIN_DIMENSION}px`);
          return;
        }
        setImageUrl(imageUrl);
      });
      
      imageElement.addEventListener('error', () => {
        setFileName('');
        setError('Error loading image. The file may be corrupted.');
      });
    });
    
    reader.readAsDataURL(file);
  };

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    processFile(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (SUPPORTED_FORMATS.includes(file.type)) {
        processFile(file);
      } else {
        setFileName('');
        setError(`Unsupported format. Please use ${FORMAT_EXTENSIONS} files only`);
      }
    }
  };

  // Function to create a centered crop with the given aspect ratio
  const createCrop = (width: number, height: number, aspect: number) => {
    const cropWidthinPercent = Math.min((MIN_DIMENSION / width) * 100, 90);
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthinPercent,
      }, 
      aspect,
      width,
      height
    );
    return centerCrop(crop, width, height);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    imgRef.current = img;
    const { width, height } = img;
    const newCrop = createCrop(width, height, aspectRatio);
    setCrop(newCrop);
  };
// Update crop when aspect ratio changes
useEffect(() => {
  if (imgRef.current && imageUrl) {
    const { width, height } = imgRef.current;
    const newCrop = createCrop(width, height, aspectRatio);
    setCrop(newCrop);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [aspectRatio, imageUrl]);

// Function to get the cropped image
const getCroppedImage = () => {
  if (!crop || !imgRef.current) {
    return null;
  }

  const image = imgRef.current;
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Calculate dimensions
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;
  
  // Set canvas size
  canvas.width = cropWidth * pixelRatio;
  canvas.height = cropHeight * pixelRatio;
  
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return null;
  }
  
  // Set quality
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(pixelRatio, pixelRatio);
  
  // Draw the cropped image
  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  
  ctx.drawImage(
    image,
    cropX, cropY, cropWidth, cropHeight,
    0, 0, cropWidth, cropHeight
  );
  
  // Get file extension from original file name
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || 'jpeg';
  let mimeType = 'image/jpeg'; // default
  
  if (fileExtension === 'png') {
    mimeType = 'image/png';
  } else if (fileExtension === 'svg') {
    mimeType = 'image/svg+xml';
  }
  
  // Convert canvas to blob
  return canvas.toDataURL(mimeType, 0.95);
};

// Function to handle image cropping
const handleCropImage = () => {
  if (!crop || !imgRef.current) {
    setError('Please select an area to crop first');
    if (onImageCropped) {
      onImageCropped(null);
    }
    return;
  }
  
  const croppedImageUrl = getCroppedImage();
  
  if (onImageCropped) {
    onImageCropped(croppedImageUrl);
  }
};

// Listen for crop requests from parent
useEffect(() => {
  // If onRequestCrop is provided (not undefined), trigger the crop
  if (onRequestCrop !== undefined) {
    handleCropImage();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [onRequestCrop]);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-2.5">
        <label htmlFor="image" className="text-lg font-medium leading-none mb-2">
          Select an image
        </label>
        <div className="relative">
          <div className="flex w-full">
            <label 
              htmlFor="image" 
              className="flex-shrink-0 cursor-pointer bg-black hover:bg-gray-800 text-white rounded-l-md px-4 py-3 font-medium"
            >
              Browse...
            </label>
            <div className="flex-grow border-2 border-l-0 border-gray-200 rounded-r-md px-4 py-3 bg-gray-50 truncate">
              {fileName ? fileName : "No file selected"}
            </div>
          </div>
          <input
            id="image"
            type="file"
            onChange={onSelectImage}
            className="hidden"
            accept=".jpg,.jpeg,.png,.svg,image/jpeg,image/png,image/svg+xml"
          />
        </div>
      </div>
      <div 
        className={`border-2 border-dashed rounded-lg p-5 h-fit w-full mt-4 transition-colors 
          ${isDragging 
            ? "border-black bg-gray-100" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400"
          }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center min-h-[250px] h-fit">
          <div className="flex items-center justify-center h-full w-full">
            {!imageUrl && !error && (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-3">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <p className="text-lg font-medium text-gray-700">Drop your image here</p>
                <p className="text-xs text-gray-400 mt-3">Supported formats: JPG, PNG, SVG</p>
              </div>
            )}
            {error && <p className="text-base text-red-500 p-4 text-center bg-red-50 rounded-md border border-red-200">{error}</p>}
            {imageUrl && !error && (
              <ReactCrop
                crop={crop}
                onChange={(percentCrop) => setCrop(percentCrop)}
                minWidth={MIN_DIMENSION}
                keepSelection
                aspect={aspectRatio}
              >
                <img
                  ref={(img) => {
                    if (img) imgRef.current = img;
                  }}
                  src={imageUrl}
                  alt="Uploaded"
                  className="rounded-md"
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )
            }
          </div>
        </div>
      </div>
    </>
  );
});

export default ImageCroper;
export type { ImageCroperProps };