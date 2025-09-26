import React from "react";
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

const SignupPage: React.FC = () => {


  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <Header />
        <div className="h-[90vh] mt-[10vh] w-full flex justify-center items-center">
          <Card className="w-full max-w-sm">
            <CardHeader className="mb-12">
              <CardTitle className="text-xl font-bold">Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email below to access your account
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
                Signup
              </Button>
              <CardAction className="w-full">
                <div className="w-fulll flex items-center justify-center">
                  <CardDescription>Already signed up?</CardDescription>
                  <Button className="p-0 pl-1" variant="link">Login</Button>
                </div>
              </CardAction>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPage;