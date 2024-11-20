import React from "react";
import { getUsers } from "@/lib/action";

export default async function page() {
  const users = await getUsers();
  console.log(users);
  return <div>Users</div>;
}
