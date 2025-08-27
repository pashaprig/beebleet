# React + Vite beebleet project

Frontend developer test assignment
Interactive form components with drag&drop

* Сustomer: [Bachana Biblaia](https://www.linkedin.com/in/bachana-biblaia/).
* Developer: [Pavlo Pryharnytskyi](https://www.linkedin.com/in/pavlo-pryharnytskyi/).

## Component overview and features implemented

### Image Upload Component
- Image upload functionality with file selection
- Drag-and-drop support for easy file uploading
- Image preview with cropping capabilities
- Aspect ratio control for image cropping (1:1, 16:9, 4:3)
- Drag and resize functionality for precise image cropping
- Real-time preview of cropped image
- Download functionality for cropped images
- Support for common image formats (JPG, PNG, SVG)
- Error handling for invalid files or file size limits
- Responsive design that works on various screen sizes

### Text Field Component
- Basic text editor layout and structure
- Currently implemented with placeholder styling and UI elements
- Text area with basic input capabilities
- Note: Advanced formatting features are currently in development
- Planned features include: rich text formatting, color picker, text alignment options

### Drag and Drop Reordering System
- Container that holds both image and text components
- Visual drag handles with grip indicators
- Components can be reordered by dragging their headers
- Visual feedback during dragging (opacity changes, border highlights)
- Components maintain their state during and after reordering
- Smooth transitions between positions

## Installation and Setup Instructions

1. Clone this repository
2. Navigate to the project directory: `cd vite-project`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit: `http://localhost:5173`

## Usage Examples

### Image Upload Component

#### Basic Usage
```jsx
import { ImageUpload } from './components/image-upload/image-upload';

function App() {
  return (
    <div className="container">
      <ImageUpload />
    </div>
  );
}
```

#### Working with Image Cropper Directly
```jsx
import { ImageCroper } from './components/image-cropper/image-cropper';
import { useState } from 'react';

function ImageCropExample() {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [cropRequestId, setCropRequestId] = useState(0);
  const [shouldDownload, setShouldDownload] = useState(false);
  
  const handleImageCropped = (croppedImage, originalFileName) => {
    if (croppedImage) {
      console.log('Image cropped successfully!');
      // Do something with the cropped image
      // e.g., upload to server, display in UI, etc.
    }
  };
  
  const handleCropRequest = () => {
    setShouldDownload(true);
    setCropRequestId(prev => prev + 1);
  };
  
  return (
    <div>
      <ImageCroper
        aspectRatio={aspectRatio}
        onRequestCrop={cropRequestId}
        onImageCropped={handleImageCropped}
        shouldDownload={shouldDownload}
      />
      <button onClick={handleCropRequest}>Crop and Download</button>
      <div>
        <button onClick={() => setAspectRatio(1)}>1:1</button>
        <button onClick={() => setAspectRatio(16/9)}>16:9</button>
        <button onClick={() => setAspectRatio(4/3)}>4:3</button>
      </div>
    </div>
  );
}
```

#### Using Image Ratios Component
```jsx
import { ImageRatios } from './components/image-ratios/image-ratios';
import { useState } from 'react';

function AspectRatioExample() {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState(1);
  
  const handleAspectRatioChange = (value) => {
    setSelectedAspectRatio(parseFloat(value));
    console.log(`Aspect ratio changed to ${value}`);
  };
  
  return (
    <div>
      <h3>Select Aspect Ratio</h3>
      <ImageRatios
        selectedAspectRatio={selectedAspectRatio}
        handleAspectRatioChange={handleAspectRatioChange}
      />
      <div>Current aspect ratio: {selectedAspectRatio}</div>
    </div>
  );
}
```

### Text Field Component

```jsx
import { TextEditor } from './components/text-editor/text-editor';

function TextEditorExample() {
  return (
    <div className="container">
      <h3>Text Editor</h3>
      <TextEditor />
      <p>Note: Advanced formatting features are in development</p>
    </div>
  );
}
```

### Drag and Drop System

#### Complete Container
```jsx
import { DragDropContainer } from './components/drag-drop/drag-drop';

function App() {
  return <DragDropContainer />;
}
```

#### Custom Implementation with CardWrapper
```jsx
import { CardWrapper } from './components/card-wrapper/card-wrapper';
import { useState } from 'react';

function CustomDragDropExample() {
  const [items, setItems] = useState([
    { id: 'item-1', title: 'Component 1', content: <div>Content 1</div> },
    { id: 'item-2', title: 'Component 2', content: <div>Content 2</div> }
  ]);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  
  const handleDragStart = (id) => {
    setDraggedId(id);
  };
  
  const handleDragOver = (id) => {
    setDragOverId(id);
  };
  
  const handleDragEnd = () => {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      const draggedIndex = items.findIndex(item => item.id === draggedId);
      const dragOverIndex = items.findIndex(item => item.id === dragOverId);
      
      const newItems = [...items];
      const draggedItem = newItems[draggedIndex];
      
      newItems.splice(draggedIndex, 1);
      newItems.splice(dragOverIndex, 0, draggedItem);
      
      setItems(newItems);
    }
    
    setDraggedId(null);
    setDragOverId(null);
  };
  
  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <CardWrapper
          key={item.id}
          id={item.id}
          title={item.title}
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={() => handleDragOver(item.id)}
          onDragEnd={handleDragEnd}
          isDragging={draggedId === item.id}
          isDragOver={dragOverId === item.id}
        >
          {item.content}
        </CardWrapper>
      ))}
    </div>
  );
}
```

## Library Choices and Reasoning

#### React + Vite
- Fast development experience with Vite's HMR (Hot Module Replacement)
- Component-based architecture for better code organization
- React's efficient rendering for smooth UI interactions

#### react-image-crop
- Powerful and flexible image cropping functionality
- Supports aspect ratio constraints
- Provides precise control over crop area
- Good performance with large images

#### Tailwind CSS
- Utility-first approach for rapid UI development
- Consistent styling across components
- Responsive design capabilities
- Easy customization

## Component API Documentation

### ImageUpload Component
```jsx
<ImageUpload />
```
Main container component that orchestrates the image upload and cropping workflow.

### ImageCroper Component
```jsx
<ImageCroper 
  aspectRatio={number}
  onRequestCrop={number}
  onImageCropped={(croppedImage, originalFileName) => void}
  shouldDownload={boolean}
/>
```

Props:
- `aspectRatio`: Controls the aspect ratio of the crop area (default: 1)
- `onRequestCrop`: Trigger number to initiate cropping
- `onImageCropped`: Callback function that receives the cropped image data URL and original filename
- `shouldDownload`: Flag to indicate if the cropped image should be downloaded

### ImageRatios Component
```jsx
<ImageRatios
  selectedAspectRatio={number}
  handleAspectRatioChange={(value) => void}
/>
```

Props:
- `selectedAspectRatio`: Currently selected aspect ratio value
- `handleAspectRatioChange`: Callback function when aspect ratio is changed

### CardWrapper Component
```jsx
<CardWrapper
  id={string}
  title={string}
  onDragStart={() => void}
  onDragOver={() => void}
  onDragEnd={() => void}
  isDragging={boolean}
  isDragOver={boolean}
>
  {children}
</CardWrapper>
```

Props:
- `id`: Unique identifier for the component
- `title`: Title displayed in the component header
- `onDragStart`: Callback when dragging starts
- `onDragOver`: Callback when dragging over this component
- `onDragEnd`: Callback when dragging ends
- `isDragging`: Whether this component is being dragged
- `isDragOver`: Whether another component is being dragged over this one
- `children`: Content to render inside the wrapper
