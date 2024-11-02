import AddProduct from "@/components/add-product";
import { getFileUrl } from "@/lib/action";

export default async function Page() {
  return (
    <div className={"h-screen w-full"}>
      <AddProduct />
    </div>
  );
}
