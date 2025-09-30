import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import useAuth from "@/hooks/useAuth";

interface LoginProps {
  generalError: string | null;
  setGeneralError: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginProps> = ({ generalError, setGeneralError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('inv');
  const [passwordError, setPasswordError] = useState('inv');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d).{8,}$/; 
  let auth = useAuth();

  async function handleLogin(e: React.FormEvent) {
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
      let data = await auth.login(email, password);
      if (data.error) { 
        setGeneralError(data.error);
      } else {
        setGeneralError('');
        navigate('/dashboard');
      }
    }
  }

  return (
    <>
      <CardContent>
        <form>
          <Label className={`mb-4 font-normal ${generalError ? 'text-red-500' : '' }`}>{generalError}</Label>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
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
        <Button type="button" className="w-full cursor-pointer" onClick={handleLogin}>
          Login
        </Button>
        <CardAction className="w-full">
          <div className="w-fulll flex items-center justify-center">
            <CardDescription>Don't have an account?</CardDescription>
            <a href="/signup">
              <Button className="p-0 pl-1 cursor-pointer" variant="link">Sign Up</Button>
            </a>
          </div>
        </CardAction>
      </CardFooter>
    </>
  );
};

export default LoginForm;