import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../../Components/Header";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {
  const [generalError, setGeneralError] = useState('');

  return (
    <>
      <div className="h-[100vh] w-full overflow-hidden">
        <Header />
        <div className="h-[90vh] w-full mt-[10vh] flex justify-center items-center">
          <Card className={`w-full max-w-sm gap-2 ${generalError ? 'border-red-500' : ''}`}>
            <CardHeader className="mb-12">
              <CardTitle className="text-xl font-bold">Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <LoginForm generalError={generalError} setGeneralError={setGeneralError} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;