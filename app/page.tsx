import LoginForm from "@/components/login-form";
import { getLoggedInUser } from "@/lib/action";
import { redirect } from "next/navigation";

export default async function Home({}: {
  // searchParams: Promise<{ userId?: string; secret?: string }>;
}) {
  // const params = await searchParams;

  return (
    <div className={"h-screen w-full flex justify-center items-center"}>
      <LoginForm />
    </div>
  );
}
