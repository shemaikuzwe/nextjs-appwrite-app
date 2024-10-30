"use server";

import { ID } from "node-appwrite";
import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwrite/appwrite.config";
import { cookies } from "next/headers";
import { db } from "@/lib/appwrite/database";
import { revalidatePath } from "next/cache";
const { account } = await createAdminClient();

export async function authenticate(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const session = await account.createEmailPasswordSession(email, password);
    await cookies().then((cookie) =>
      cookie.set("session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(session.expire),
        secure: process.env.NODE_ENV === "production",
      }),
    );
    redirect("/dashboard");
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  try {
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    await cookies().then((cookie) =>
      cookie.set("session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(session.expire),
      }),
    );
    redirect("/dashboard");
  } catch (e) {
    console.log(e);
    throw e;
  }
}
export async function signOut() {
  try {
    const { account } = await createSessionClient();
    cookies().then((cookie) => cookie.delete("session"));
    await account.deleteSession("current");
    return redirect("/");
  } catch (err) {
    throw err;
  }
}
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (e) {
    return null;
  }
}
export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  try {
    await db.products.create({ name, price });
    revalidatePath("/dashboard");
    // redirect("/dashboard");
  } catch (e) {
    throw e;
  }
}
export async function editProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const id = formData.get("id") as string;
    await db.products.update(id, { name, price });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  } catch (e) {
    throw e;
  }
}
export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;
  try {
    await db.products.delete(id);
    revalidatePath("/dashboard");
  } catch (e) {
    throw e;
  }
}
