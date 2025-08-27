import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import ImageCroper from "../image-cropper/image-cropper";
import ImageRatios from "../image-ratios/image-ratios";

const ImageUpload = React.memo(function ImageUpload() {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [cropRequestId, setCropRequestId] = useState<number>(0);

  const handleAspectRatioChange = useCallback((value: string) => {
    setSelectedAspectRatio(parseFloat(value));
  }, []);
  
  // Function to trigger crop request
  const handleRequestCrop = useCallback(() => {
    setCropRequestId(prev => prev + 1); // Increment to trigger effect in child component
  }, []);
  
  // Handle the cropped image result
  const handleImageCropped = useCallback((croppedImage: string | null) => {
    setIsDownloading(true);
    
    try {
      if (croppedImage) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = croppedImage;
        
        // Set the download attribute with a filename
        const fileExtension = croppedImage.startsWith('data:image/png') ? 'png' : 
                             croppedImage.startsWith('data:image/svg+xml') ? 'svg' : 'jpg';
        link.download = `cropped-image.${fileExtension}`;
        
        // Append to the document, trigger click and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-4 bg-gradient-to-r rounded-t-lg">
        <CardTitle className="text-2xl ">Image Manager</CardTitle>
        <CardDescription className="text-base ">Upload, crop, and customize your images</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <ImageCroper 
          aspectRatio={selectedAspectRatio}
          onRequestCrop={cropRequestId > 0 ? () => {} : undefined}
          onImageCropped={handleImageCropped}
        />
        <ImageRatios 
          selectedAspectRatio={selectedAspectRatio} 
          handleAspectRatioChange={handleAspectRatioChange} 
        />

        <Button 
          className="w-full text-lg font-medium" 
          onClick={handleRequestCrop}
          disabled={isDownloading}
        >
          {isDownloading ? 'Processing...' : 'Download Image'}
        </Button>
      </CardContent>
    </Card>
  );
});

export default ImageUpload;