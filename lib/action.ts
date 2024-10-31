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

const { account, storage, message, users } = await createAdminClient();

const BUCKET_ID = process.env.BUCKET_ID;

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
    throw e;
  }
}
export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const imageUpload = formData.get("image") as File;
  try {
    const image = await uploadImage(imageUpload);
    await db.products.create({ name, price, image });

    // const content = `Hi from Appwrite New product added ${name} With price: ${price.toLocaleString()} Rwf And discount: 10% For first 100
    //  Buyers.
    // `;
    // await sendSMSNotification(content);
    // revalidatePath("/dashboard");
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
export async function sendSMSNotification(content: string) {
  try {
    const users = await getUsers();
    const newMessage = await message.createSms(ID.unique(), content, [], users);
  } catch (e) {
    console.log(e);
  }
}
async function getUsers() {
  try {
    const user = await users.list();
    return user.users.map((user) => user.$id);
  } catch (err) {
    console.log(err);
  }
}
async function uploadImage(file: File) {
  try {
    const image = await storage.createFile(BUCKET_ID!, ID.unique(), file);
    return image.$id;
  } catch (e) {
    console.log(e);
  }
}
export async function getFile(id: string) {
  try {
  } catch (e) {
    console.log(e);
  }
}
