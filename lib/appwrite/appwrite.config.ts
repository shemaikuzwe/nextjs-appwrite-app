"use server";
import {
  Account,
  Client,
  Databases,
  Messaging,
  Users,
  Storage,
} from "node-appwrite";
import { cookies } from "next/headers";
import { appwriteConfig } from "./config";
export async function createSessionClient() {
  const client = new Client()
    .setProject(appwriteConfig.projectId)
    .setEndpoint(appwriteConfig.endpoint);
  const session = (await cookies()).get("session");
  if (!session || !session.value) {
    throw new Error("Session not found");
  }
  const sessionValue = session.value;
  client.setSession(sessionValue);
  return {
    get account() {
      return new Account(client);
    },
    get users(){
      return new Users(client)
    }
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get message() {
      return new Messaging(client);
    },
    get users() {
      return new Users(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}
