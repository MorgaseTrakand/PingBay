import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  CardDescription,
  CardFooter,
  CardAction,
  CardContent
} from "@/components/ui/card";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('inv');
  const [passwordError, setPasswordError] = useState('inv');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{8,}$/; 

   function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    let valid = true;

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("inv");
    }

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters and include a number");
      valid = false;
    } else {
      setPasswordError("inv");
    }

    if (valid) {
      console.log("Submitting:", { email, password });
      // TODO: call API
    }
  }

  return (  
    <>
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
        <Button type="button" className="w-full cursor-pointer" onClick={handleSignup}>
          Signup
        </Button>
        <CardAction className="w-full">
          <div className="w-full flex items-center justify-center">
            <CardDescription>Already signed up?</CardDescription>
            <a href="/login">
              <Button className="p-0 pl-1 cursor-pointer" variant="link">Login</Button>
            </a>
          </div>
        </CardAction>
      </CardFooter>
    </>
  );
};

export default SignupForm;