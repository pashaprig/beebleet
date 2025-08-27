import React from "react";
import { GripVertical } from "lucide-react";

type CardWrapperProps = {
    title: string;
    children: React.ReactNode;
}

const CardWrapper = React.memo(({title, children}: CardWrapperProps) => { 
    return (
        <div className="text-wrapper flex flex-col w-full md:flex-1 border-2 rounded-lg p-3 bg-white shadow-md">
        <div className="flex items-center gap-2 mb-3 bg-slate-100 p-3 rounded-md border-2 border-dashed border-slate-300 cursor-move hover:bg-slate-200 transition-colors">
          <div className="p-1 cursor-grab hover:bg-slate-300 rounded">
            <GripVertical className="h-6 w-6 text-slate-600" />
          </div>

          <div className="flex flex-col">
            <span className="font-medium text-lg">{title}</span>
            <span className="text-sm text-slate-500">Drag to reposition this component</span>
          </div>
        </div>
        {children}
      </div>
    )
})
export default CardWrapper;