import React, { useState } from "react";
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
import { FormRow } from "@/pages/Components/FormRow";

interface SignupProps {
  generalError: string | null;
  setGeneralError: React.Dispatch<React.SetStateAction<string>>;
}

export const SignupForm: React.FC<SignupProps> = ({setGeneralError, generalError}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
 
  let navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setEmailError('');

    const {valid, errors} = useFormValidation().checkAuthForm(email, password)

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
            <FormRow setValue={setEmail} error={emailError} labelTitle="Email" type="email" placeholder="email@example.com" />
            <FormRow setValue={setPassword} error={passwordError} labelTitle="Password" type="password" placeholder="password" />            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer" onClick={handleSignup}>
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