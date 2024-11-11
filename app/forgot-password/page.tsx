"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPassword from "@/components/forgot-password";
import { notFound } from "next/navigation";

export default async function Page() {
  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            App Write
          </CardTitle>
          <CardDescription className="text-center">
            Forgot Password Enter your Email to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ForgotPassword />
        </CardContent>
      </Card>
    </div>
  );
}
