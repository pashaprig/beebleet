import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";
import { ASPECT_RATIO_OPTIONS } from "@/consts/consts";

interface ImageRatiosProps {
  selectedAspectRatio: number;
  handleAspectRatioChange: (value: string) => void;
}

const ImageRatios = React.memo(function ImageRatios({ selectedAspectRatio, handleAspectRatioChange }: ImageRatiosProps) {
  return (


    <div className="space-y-3 py-3 bg-slate-50 p-4 rounded-md border border-slate-200">
      <label className="text-base font-medium leading-none mb-3 block text-center">Aspect ratio</label>
      <ToggleGroup
        type="single"
        value={selectedAspectRatio.toString()}
        onValueChange={(value) => value && handleAspectRatioChange(value)}
        className="justify-center"
      >
        {ASPECT_RATIO_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value.toString()}
            aria-label={`Set aspect ratio to ${option.label}`}
            className="px-4 bg-white"
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>

  );
});

export default ImageRatios;