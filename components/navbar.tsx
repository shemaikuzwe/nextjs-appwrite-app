import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logout from "@/components/logout";
import { Models } from "node-appwrite";
import { TLink } from "@/lib/types";
import Link from "next/link";
export default function Navbar({
  user,
}: {
  user: Models.User<Models.Preferences> | null;
}) {
  const links: TLink[] = [
    {
      name: "products",
      href: "/dashboard",
    },
    {
      name: "users",
      href: "/dashboard/users",
    },
  ];
  return (
    <div
      className={
        "flex flex-col justify-start items-start w-[40vw] h-screen gap-4"
      }
    >
      <h3 className=" text-2xl font-bold">Appwrite</h3>
      <div className="flex  flex-col justify-center items-center gap-2 pt-10">
        {links.map((link) => (
          <Link href={link.href} key={link.name} className="px-2 font-semibold">
            {link.name}
          </Link>
        ))}
      </div>
      <div className="pt-20">
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
    </div>
  );
}
