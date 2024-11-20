import { getLoggedInUser } from "@/lib/action";
import { db } from "@/lib/appwrite/database";

import Products from "@/components/products";
import { Product } from "@/lib/types";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedInUser();
  const products = await db.products.list();
  return (
    <div
      className={
        "h-screen w-full pt-10 px-5 flex gap-5 flex-between ax-md:flex-row"
      }
    >
      <Navbar user={user} />
      <Products products={products.documents as Product[]} />
      {children}
    </div>
  );
}
