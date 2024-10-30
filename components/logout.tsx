"use client"

import {Button} from "@/components/ui/button";
import {signOut} from "@/lib/action";

export default function Logout() {
  return   <Button size={"sm"} variant={"ghost"} onClick={signOut}>
      Logout
  </Button>
}
