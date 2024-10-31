import { getLoggedInUser } from "@/lib/action";
import { db } from "@/lib/appwrite/database";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logout from "@/components/logout";
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
      <div className={"flex justify-start items-start "}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>
                {user?.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Products products={products.documents as Product[]} />
      {children}
    </div>
  );
}
