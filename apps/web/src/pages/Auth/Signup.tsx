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

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('inv');
  const [passwordError, setPasswordError] = useState('inv');

  async function handleSignup() {
    // let result = await fetch('http://localhost:3000/auth/signup', {
    //   method: "POST",
    //   body: JSON.stringify({ email: email, password: password })
    // })
    setPasswordError("Password invalid");
    setEmailError("Email already in use");
  }

  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <Header />
        <div className="h-[90vh] mt-[10vh] w-full flex justify-center items-center">
          <Card className="w-full max-w-sm gap-2">
            <CardHeader className="mb-16">
              <CardTitle className="text-xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-0">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="grid gap-1">
                      <Input
                        className={`h-12 ${emailError !== 'inv' ? 'border-red-500 bg-red-50' : '' }`}
                        id="email"
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                        placeholder="email@example.com"
                        required
                      />
                      <CardDescription className={`mb-4 leading-none ${emailError !== 'inv' ? 'text-red-500' : 'text-white'}`}>{emailError}</CardDescription>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="grid gap-1">
                      <Input 
                        className={`h-12 ${passwordError !== 'inv' ? 'border-red-500 bg-red-50' : '' }`}
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                        placeholder="password"
                        id="password"
                        type="password" 
                        required 
                      />
                      <CardDescription className={`mb-2 leading-none ${emailError !== 'inv' ? 'text-red-500' : 'text-white'}`}>{passwordError}</CardDescription>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" onClick={handleSignup}>
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