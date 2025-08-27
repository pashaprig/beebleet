import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import React from "react";
import ImageCroper from "../image-cropper/image-cropper";

const ImageUpload = React.memo(function ImageUpload() {

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="pb-4 bg-gradient-to-r rounded-t-lg">
        <CardTitle className="text-2xl ">Image Manager</CardTitle>
        <CardDescription className="text-base ">Upload, crop, and customize your images</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">

        <ImageCroper />

                <div className="space-y-3 py-3 bg-slate-50 p-4 rounded-md border border-slate-200">
          <label className="text-base font-medium leading-none">Crop ratio</label>
          <Slider defaultValue={[50]} max={100} step={1} className="h-3" />
        </div>
        
        <Button className="w-full text-lg font-medium">
          Save Image
        </Button>
      </CardContent>
    </Card>
  );
});

export default ImageUpload;