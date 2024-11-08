"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "@/lib/action";
import Email from "@/components/email";
import GithubProvider from "@/components/github-provider";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(authenticate, undefined);
  return (
    <div className="flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            App Write
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to login
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form action={action}>
            {state?.message && (
              <span className={"mb-2 text-red-400 text-sm"}>
                {state.message}
              </span>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoCapitalize="none"
                name="email"
                autoCorrect="off"
              />
            </div>
            {state?.errors?.email &&
              state.errors.email.map((error) => (
                <span className={"mb-2 text-red-400 text-sm"} key={error}>
                  {error}
                </span>
              ))}
            <div className="flex justify-end items-end ">
              <Button variant={"link"} asChild>
                <Link href={"/auth/forgot-password"}> forgot password?</Link>
              </Button>
            </div>
            <div className="grid gap-2 mt-2 mb-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                name="password"
              />
            </div>
            {state?.errors?.password &&
              state.errors.password.map((error) => (
                <span className={"mb-2 text-red-400 text-sm"} key={error}>
                  {error}
                </span>
              ))}
            <div className={"flex justify-center items-center"}>
              <Button
                className={`${isPending ? "cursor-not-allowed opacity-10" : ""}`}
              >
                {isPending ? "Logging in" : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/*<GithubProvider />*/}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center text-gray-600 mt-2">
            Don&apos;t have an account?
            <Link href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
