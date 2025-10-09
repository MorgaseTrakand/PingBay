import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../../Components/Header";
import { SignupForm } from "./SignupForm";

const SignupPage: React.FC = () => {
  const [generalError, setGeneralError] = useState('');
  return (
    <>
      <div className="h-screen w-full overflow-hidden">
        <Header />
        <div className="h-[90vh] mt-[10vh] w-full flex justify-center items-center">
          <Card className={`w-full max-w-sm gap-2 ${generalError ? 'border-red-500' : ''}`}>
            <CardHeader className="mb-12">
              <CardTitle className="text-xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create an account
              </CardDescription>
            </CardHeader>
            <SignupForm setGeneralError={setGeneralError} generalError={generalError}/>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignupPage;