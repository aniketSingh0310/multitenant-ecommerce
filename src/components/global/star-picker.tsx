import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
  value?: number;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}
const StarPicker = ({ value = 0, onChange, disabled, className }: Props) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div
      className={cn(
        "flex items-center",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )} 
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          className={cn(
            "p-0.5 hover:scale-110 transition",
            !disabled && "cursor-pointer"
          )}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
        >
          <StarIcon
            className={cn(
              "size-5",
              (hoverValue || value) >= star
                ? "fill-yellow-300  stroke-black"
                : "stroke-black"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarPicker;
