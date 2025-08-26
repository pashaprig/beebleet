import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import ImageUpload from "../image-upload/image-upload";
import TextEditor from "../text-editor/text-editor";

export function DragDropContainer() {
  return (
    <div className="flex w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Builder</CardTitle>
          <CardDescription>Drag and drop components to build your page</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-6 flex-wrap">
          {/* Component Item 1 */}
          <div className="flex flex-col flex-1 border rounded-md p-2 bg-background mb-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 cursor-grab hover:bg-muted rounded">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium">Image Component</span>
            </div>
            <ImageUpload />
          </div>
          
          {/* Component Item 2 */}
          <div className="flex flex-col flex-1 border rounded-md p-2 bg-background">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 cursor-grab hover:bg-muted rounded">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="font-medium">Text Component</span>
            </div>
            <TextEditor />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
