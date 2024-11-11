import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import ChangePassword from "@/components/change-password";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ userId: string; secret: string; expire: Date }>;
}) {
  const { userId, secret, expire } = await searchParams;
  if (!userId || !secret) {
    return notFound();
  }
  const now = new Date();
  const expired = new Date(expire);
  if (now < expired) {
    throw new Error("Link expired");
  }
  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            App Write
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePassword userId={userId} secret={secret} />
        </CardContent>
      </Card>
    </div>
  );
}
