import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import Link from "next/link";
import { editProduct } from "@/lib/action";
import { Product } from "@/lib/types";

const Icons = {
  spinner: Loader2,
};

interface Props {
  id: string;
  product: Product;
}
export default function EditProduct({ id, product }: Props) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Edit product
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={editProduct}>
            <input type="hidden" name="id" value={id} />
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                defaultValue={product.name}
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
                defaultValue={product.price}
                name="price"
              />
            </div>

            <div className={"flex justify-center items-center"}>
              <Button>Edit Product</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
