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
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useFormValidation from "@/hooks/useFormValidation";

interface SignupProps {
  generalError: string | null;
  setGeneralError: React.Dispatch<React.SetStateAction<string>>;
}

const SignupForm: React.FC<SignupProps> = ({setGeneralError, generalError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 
  let navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setEmailError('');

    const {valid, errors} = useFormValidation().checkForm(email, password)

    if (valid) {
      let data = await useAuth().signup(email, password);
      if (data.error) { 
        setGeneralError(data.error);
      } else {
        setGeneralError('');
        navigate('/dashboard');
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
              <Label htmlFor="password">Password</Label>
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
                <CardDescription className={`mb-2 leading-none ${emailError ? 'text-red-500' : 'text-white'}`}>{passwordError}</CardDescription>
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