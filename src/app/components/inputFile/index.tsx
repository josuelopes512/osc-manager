"use client";
import { Button, cn } from "@nextui-org/react";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";

interface InputFileProps {
  onChange: (file: File) => void;
  isRequired?: boolean;
}

export function InputFile({ onChange, isRequired }: InputFileProps) {
  const [image, setImage] = useState<File>();
  return (
    <label
      data-slot="input-wrapper"
      className={cn(
        "relative w-full inline-flex tap-highlight-transparent shadow-sm px-3",
        "border-medium border-default-200 data-[hover=true]:border-default-400",
        "group-data-[focus=true]:border-default-foreground min-h-10 rounded-medium",
        "flex-col items-start justify-center gap-0 !duration-150",
        "transition-colors motion-reduce:transition-none h-14 py-2",
      )}
    >
      <span
        data-slot="label"
        // htmlFor="photo"
        className={cn(
          "absolute z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased",
          "block text-foreground-500 cursor-text",
          isRequired && "after:content-['*'] after:text-danger after:ml-0.5",
          "will-change-auto !duration-200 !ease-out motion-reduce:transition-none",
          "transition-[transform,color,left,opacity] text-small pe-2 max-w-full",
          "text-ellipsis overflow-hidden",
          image && "text-default-600 pointer-events-auto scale-85",
          image &&
            "-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]",
        )}
      >
        Photo
      </span>
      {image && (
        <div className="flex translate-y-6 w-full justify-between">
          {image.name}
        </div>
      )}

      <div
        data-slot="inner-wrapper"
        className="inline-flex w-full items-center justify-end h-full box-border group-data-[has-label=true]:items-end"
      >
        <input
          data-slot="input"
          type="file"
          className="hidden"
          accept="image/*"
          multiple
          id="photo"
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
              onChange(e.target.files[0]);
            }
          }}
          // value={value}
        />
        <Button
          isIconOnly
          variant="light"
          radius="full"
          size="sm"
          className={cn("-mr-2", image && "mb-2")}
        >
          <FaUpload className="text-xl text-foreground-500" />
        </Button>
      </div>
    </label>
  );
}
