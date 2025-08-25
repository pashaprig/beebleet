import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Slider } from "@/components/ui/slider";

export function ImageUpload(){
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Image Upload</CardTitle>
        <CardDescription>Upload and crop your image</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="image" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Select image
          </label>
          <input
            id="image"
            type="file"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        <div className="border rounded-md p-4">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Image preview will appear here</p>
            </div>
          </AspectRatio>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">Crop ratio</label>
          <Slider defaultValue={[50]} max={100} step={1} />
        </div>
        
        <Button className="w-full">Save Image</Button>
      </CardContent>
    </Card>
  );
}