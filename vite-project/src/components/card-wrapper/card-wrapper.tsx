import React, { useRef } from "react";
import { GripVertical } from "lucide-react";

type CardWrapperProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  onDragStart: () => void;
  onDragOver: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  isDragOver: boolean;
}

const CardWrapper = React.memo(({
  id,
  title,
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
  isDragOver
}: CardWrapperProps) => {
  const headerRef = useRef<HTMLDivElement>(null);

  // Drag event handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Set data for dragging
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";

    // Store a reference to the current target
    const currentTarget = e.currentTarget;

    // Set opacity of the dragged element using CSS classes instead of direct style manipulation
    setTimeout(() => {
      if (currentTarget) {
        currentTarget.classList.add("opacity-40");
      }
    }, 0);

    onDragStart();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    onDragOver();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Store a reference to the current target
    const currentTarget = e.currentTarget;

    // Restore opacity by removing the class
    if (currentTarget) {
      currentTarget.classList.remove("opacity-40");
    }

    onDragEnd();
  };

  // Classes for visual feedback
  const wrapperClasses = `card-wrapper text-wrapper flex flex-col w-full md:flex-1 border-2 rounded-lg p-3 bg-white shadow-md 
        ${isDragging ? "opacity-40" : ""} 
        ${isDragOver ? "border-blue-500 border-2" : ""}
        transition-all duration-200`;

  const headerClasses = `card-wrapper-header flex items-center gap-2 mb-3 p-3 rounded-md border-2 border-dashed 
        ${isDragOver ? "bg-blue-100 border-blue-300" : "bg-slate-100 border-slate-300"} 
        cursor-move hover:bg-slate-200 transition-colors`;

  return (
    <div
      className={wrapperClasses}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        ref={headerRef}
        className={headerClasses}
      >
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