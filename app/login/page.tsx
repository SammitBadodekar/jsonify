"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account using Google
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/login/google">
              <FaGoogle className="mr-2 h-4 w-4" />
              Sign in with Google
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
