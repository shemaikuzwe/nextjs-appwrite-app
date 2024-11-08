"use server";

import {
  Account,
  AppwriteException,
  Client,
  ID,
  OAuthProvider,
} from "node-appwrite";
import { redirect } from "next/navigation";
import {
  createAdminClient,
  createSessionClient,
} from "@/lib/appwrite/appwrite.config";
import { cookies } from "next/headers";
import { db } from "@/lib/appwrite/database";
import { revalidatePath } from "next/cache";
import { LoginState, SignupState } from "@/lib/types";
import { LoginSchema, SignupSchema } from "@/lib/schema";

const { storage, message, users } = await createAdminClient();

const BUCKET_ID = process.env.BUCKET_ID;

export async function authenticate(
  prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState | undefined> {
  const validate = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validate.data;

  const { account } = await createAdminClient();
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
  } catch (err) {
    if (err instanceof AppwriteException) {
      switch (err.code) {
        case 400:
          return { message: "Invalid credentials" };
        case 401:
          return { message: "Invalid credentials" };
        default: {
          return { message: "Something went wrong" };
        }
      }
    }
    throw err;
  }
}
export async function signUp(
  prevState: SignupState | undefined,
  formData: FormData,
): Promise<SignupState | undefined> {
  const validate = SignupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    phone: formData.get("phone"),
  });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const { email, password, name, phone } = validate.data;
  try {
    const { account } = await createAdminClient();
    const user = await account.create(ID.unique(), email, password, name);
    // await account.updatePrefs(user.$id);
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
    if (e instanceof AppwriteException) {
      switch (e.code) {
        case 409:
          return { message: "Email already exists" };
      }
    }
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
    if (await account.get()) {
      return await account.get();
    }
    return null;
  } catch (e) {
    return null;
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
    revalidatePath("/dashboard");
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
export const sendEmail = async (formData: FormData) => {
  const { account } = await createAdminClient();
  const email = formData.get("email") as string;
  await account.createMagicURLToken(ID.unique(), email);
};
export async function signInWithGithub() {
  try {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject("67209a4e00093f6ad7c0"); // Your project ID

    const account = new Account(client);
    const session = await account.createOAuth2Token(
      OAuthProvider.Github,
      "http://localhost:3000/dashboard",
      "http://localhost:3000",
    );
    return session;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
}
