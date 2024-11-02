"use client";
import { Product } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProduct } from "@/lib/action";
import Image from "next/image";

export default function Products({ products }: { products: Product[] }) {
  const PROJECT_ID = process.env.PROJECT_ID as string;
  const BUCKET_ID = process.env.BUCKET_ID as string;
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date Added</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products ? (
          products.map((doc) => (
            <TableRow key={doc.$id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>{doc.price.toLocaleString()} Rwf</TableCell>
              <TableCell>
                <Image
                  src={`https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${doc.image}/view?project=${PROJECT_ID}`}
                  width={50}
                  height={50}
                  alt={doc.name}
                />
              </TableCell>
              <TableCell>{new Date(doc.$createdAt).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={`/dashboard/edit/${doc.$id}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <form action={deleteProduct}>
                        <input type={"hidden"} name={"id"} value={doc.$id} />
                        <Button
                          variant={"destructive"}
                          size={"sm"}
                          type={"submit"}
                        >
                          Delete
                        </Button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <span className={"font-medium text-2xl"}>No Products Found</span>
        )}
      </TableBody>
    </Table>
  );
}
