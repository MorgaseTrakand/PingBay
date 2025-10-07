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
import useFormValidation from "@/hooks/useFormValidation";
import { useSearchParams } from "react-router-dom";

interface LoginProps {
  generalError: string | null;
  setGeneralError: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginProps> = ({ generalError, setGeneralError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [redirectURL] = useState(searchParams.get('redirect'));

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setEmailError('');
    
    const {valid, errors} = useFormValidation().checkForm(email, password)

    if (valid) {
      let data = await useAuth().login(email, password);
      if (data.error) { 
        setGeneralError(data.error);
      } else {
        setGeneralError('');
        if (redirectURL) {
          navigate(redirectURL)
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      setEmailError(errors.email ?? '')
      setPasswordError(errors.password ?? '')
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
                  className={`h-12 ${emailError ? 'border-red-500 bg-red-50' : '' }`}
                  id="email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  placeholder="email@example.com"
                  required
                />
                <CardDescription className={`mb-4 leading-none ${emailError ? 'text-red-500' : 'text-white'}`}>{emailError}</CardDescription>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="grid gap-1">
                <Input 
                  className={`h-12 ${passwordError ? 'border-red-500 bg-red-50' : '' }`}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  placeholder="password"
                  id="password"
                  type="password" 
                  required 
                />
                <CardDescription className={`mb-2 leading-none ${passwordError ? 'text-red-500' : 'text-white'}`}>{passwordError}</CardDescription>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer" onClick={handleLogin}>
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