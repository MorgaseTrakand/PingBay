import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../Components/Header";

const LoginPage: React.FC = () => {


  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <Header />
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <CardAction className="w-full">
              <div className="w-fulll flex items-center justify-center">
                <CardDescription>Don't have an account?</CardDescription>
                <Button className="p-0 pl-1" variant="link">Sign Up</Button>
              </div>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;