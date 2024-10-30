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
import { Loader2 } from "lucide-react";

import Link from "next/link";
import {signUp} from "@/lib/action";
// import Google from "./google";
// import Link from "next/link";
const Icons = {
    spinner: Loader2,
};

export default function SignUpForm() {


    return (
        <div className="flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        App Write
                    </CardTitle>
                    <CardDescription className="text-center">
                      Welcome Create Your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <form action={signUp}>
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
                        <div className="grid gap-2">

                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your names"
                                autoCapitalize="none"
                                name="name"
                                autoCorrect="off"
                            />

                        </div>
                        <div className="flex justify-end items-end ">
                            <Button variant={"link"} asChild><Link href={"/auth/forgot-password"}> forgot
                                password?</Link></Button>
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

                        <div className={"flex justify-center items-center"}><Button>Login</Button></div>
                    </form>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"/>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <p className="text-sm text-center text-gray-600 mt-2">
                        Already have an account?
                        <a href="/" className="text-blue-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
