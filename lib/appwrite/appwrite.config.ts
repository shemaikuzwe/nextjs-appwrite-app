import { Account, Client, Databases } from "node-appwrite";
import { cookies } from "next/headers";

export const {
  PROJECT_ID,
  API_ENDPOINT,
  API_SECRET,
  DATABSE_ID,
  COLLECTION_ID,
} = process.env;

export async function createSessionClient() {
  const client = new Client()
    .setProject(PROJECT_ID!)
    .setEndpoint(API_ENDPOINT!);

  const session = cookies().then((result) => result.get("session"));
  if (!session || !session.then((session) => session?.value)) {
    throw new Error("Session not found");
  }
  const sessionValue = (await session.then(
    (session) => session?.value,
  )) as string;
  client.setSession(sessionValue);
  return {
    get account() {
      return new Account(client);
    },
  };
}
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(API_ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
  };
}

const client = new Client().setProject(PROJECT_ID!).setEndpoint(API_ENDPOINT!);
export const database = new Databases(client);
