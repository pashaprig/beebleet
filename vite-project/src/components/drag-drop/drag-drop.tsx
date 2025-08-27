import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import ImageUpload from "../image-upload/image-upload";
import TextEditor from "../text-editor/text-editor";

export function DragDropContainer() {
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
          {/* Component Item 1 */}
          <div className="image-wrapper flex flex-col w-full md:flex-1 border-2 rounded-lg p-3 bg-white shadow-md mb-4 md:mb-0 h-fit">
            <div className="flex items-center gap-2 mb-3 bg-slate-100 p-3 rounded-md border-2 border-dashed border-slate-300 cursor-move hover:bg-slate-200 transition-colors">
              <div className="p-1 cursor-grab hover:bg-slate-300 rounded">
                <GripVertical className="h-6 w-6 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg">Image Component</span>
                <span className="text-sm text-slate-500">Drag to reposition this component</span>
              </div>
            </div>
            <ImageUpload />
          </div>
          
          {/* Component Item 2 */}
          <div className="text-wrapper flex flex-col w-full md:flex-1 border-2 rounded-lg p-3 bg-white shadow-md">
            <div className="flex items-center gap-2 mb-3 bg-slate-100 p-3 rounded-md border-2 border-dashed border-slate-300 cursor-move hover:bg-slate-200 transition-colors">
              <div className="p-1 cursor-grab hover:bg-slate-300 rounded">
                <GripVertical className="h-6 w-6 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-lg">Text Component</span>
                <span className="text-sm text-slate-500">Drag to reposition this component</span>
              </div>
            </div>
            <TextEditor />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
