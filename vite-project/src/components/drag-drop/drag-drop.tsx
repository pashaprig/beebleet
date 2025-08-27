import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "../image-upload/image-upload";
import TextEditor from "../text-editor/text-editor";
import CardWrapper from "../card-wrapper/card-wrapper";
import { useState, useCallback } from "react";

type ComponentItem = {
  id: string;
  title: string;
  component: React.ReactNode;
};

export function DragDropContainer() {
  const [components, setComponents] = useState<ComponentItem[]>([
    {
      id: "image-manager",
      title: "Image Manager",
      component: <ImageUpload />
    },
    {
      id: "text-component",
      title: "Text Component",
      component: <TextEditor />
    }
  ]);

  // State for tracking drag operations
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

  // Handler for drag start event
  const handleDragStart = useCallback((id: string) => {
    setDraggedItemId(id);
  }, []);

  // Handler for drag over another element
  const handleDragOver = useCallback((id: string) => {
    setDragOverItemId(id);
  }, []);

  // Handler for drag end event
  const handleDragEnd = useCallback(() => {
    if (draggedItemId && dragOverItemId && draggedItemId !== dragOverItemId) {
      // Create a new array with the changed order
      const draggedItemIndex = components.findIndex(item => item.id === draggedItemId);
      const dragOverItemIndex = components.findIndex(item => item.id === dragOverItemId);

      const newComponents = [...components];
      const draggedItem = newComponents[draggedItemIndex];

      // Remove the item from its current position
      newComponents.splice(draggedItemIndex, 1);

      // Insert the item at the new position
      newComponents.splice(dragOverItemIndex, 0, draggedItem);

      // Update the state
      setComponents(newComponents);
    }

    // Reset the drag states
    setDraggedItemId(null);
    setDragOverItemId(null);
  }, [components, draggedItemId, dragOverItemId]);

  return (
    <div className="d-n-d flex items-center justify-center w-full min-h-screen max-w-4xl mx-auto p-4 space-y-6">
      <Card className="flex flex-col justify-center w-full h-fit">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <CardTitle className="text-2xl font-bold">Interactive Page Builder</CardTitle>
          <CardDescription className="text-base">
            Drag and drop components to customize your page layout. Use the grip handles to reposition elements.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row p-1 flex-wrap gap-4">
          {components.map((item) => (
            <CardWrapper
              key={item.id}
              id={item.id}
              title={item.title}
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={() => handleDragOver(item.id)}
              onDragEnd={handleDragEnd}
              isDragging={draggedItemId === item.id}
              isDragOver={dragOverItemId === item.id}
            >
              {item.component}
            </CardWrapper>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
