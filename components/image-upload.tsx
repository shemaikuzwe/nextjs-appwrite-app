import React from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ImageUploadProps extends React.ComponentPropsWithoutRef<"input"> {
  image: string | null;
  label: string;
}
export default function ImageUpload({
  image,
  label,
  ...props
}: ImageUploadProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20 border-1 border-border rounded-lg overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt="image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : null}
        {image ? null : (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <ImagePlus className="w-7 h-7 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <Input {...props} type="file" className="hidden" />
        <Label
          htmlFor={props.name}
          className="inline-flex items-center gap-2  px-2 py-2 bg-primary text-primary-foreground rounded-sm cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <ImagePlus className="w-4 h-4" /> {label}
        </Label>
      </div>
    </div>
  );
}
