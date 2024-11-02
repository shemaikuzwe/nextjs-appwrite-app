import LoginForm from "@/components/login-form";
import { Client, Account } from "node-appwrite";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string; userId?: string }>;
}) {
  const params = await searchParams;
  const secret = params.secret;
  const userId = params.userId;
  if (userId && secret) {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("<PROJECT_ID>");

    const account = new Account(client);
    const user = await account.createSession(userId, secret);
    console.log(user);
  }

  return (
    <div className={"h-screen w-full flex justify-center items-center"}>
      <LoginForm />
    </div>
  );
}
