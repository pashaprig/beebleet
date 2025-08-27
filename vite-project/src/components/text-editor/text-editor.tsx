import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import React from "react";

const TextEditor = React.memo(function TextEditor() {
  return (
    <Card className="w-full max-w-md flex flex-col h-full justify-between">
      <CardHeader>
        <CardTitle>Text Editor</CardTitle>
        <CardDescription>Add and format text</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4  flex-grow-1">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <ToggleGroup type="multiple"  className="flex-wrap">
              <ToggleGroupItem value="bold" aria-label="Toggle bold">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            
            <ToggleGroup type="single" className="flex-wrap">
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        
        <Textarea 
          placeholder="Enter your text here..." 
          className="min-h-[220px]  flex-grow-1" 
        />
        
        <Button className="w-full">Save Text</Button>
      </CardContent>
    </Card>
  );
});

export default TextEditor;