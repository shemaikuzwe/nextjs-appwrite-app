import EditProduct from "@/components/edit-form";
import { db } from "@/lib/appwrite/database";
import { Product } from "@/lib/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await db.products.get(id);
  return (
    <div className={"h-screen w-full"}>
      <EditProduct id={id} product={product as Product} />;
    </div>
  );
}
