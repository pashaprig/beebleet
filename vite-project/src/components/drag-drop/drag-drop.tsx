import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUpload from "../image-upload/image-upload";
import TextEditor from "../text-editor/text-editor";
import CardWrapper from "../card-wrapper/card-wrapper";

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
          <CardWrapper title="Image Manager" >
            <ImageUpload />
          </CardWrapper>

          {/* Component Item 2 */}
          <CardWrapper title="Text Component" >
            <TextEditor />
          </CardWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
