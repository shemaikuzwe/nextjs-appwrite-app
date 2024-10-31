"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addProduct } from "@/lib/action";
import ImageUpload from "@/components/image-upload";
import React, { useState } from "react";

// const Icons = {
//   spinner: Loader2,
// };

export default function AddProduct() {
  const [image, setImage] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const file = fileList[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e) {
        setImage(e.target?.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Add product
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={addProduct}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                autoCapitalize="none"
                name="name"
                autoCorrect="off"
              />
            </div>

            <div className="grid gap-2 mt-2 mb-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter password"
                name="price"
              />
            </div>
            <ImageUpload
              label={image ? "Change Image" : "Upload Image "}
              image={image}
              onChange={handleFileChange}
              name={"image"}
              id={"image"}
            />
            <div className={"flex justify-center items-center"}>
              <Button>Add Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
