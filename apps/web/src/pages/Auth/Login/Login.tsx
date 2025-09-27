import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../../Components/Header";
import LoginForm from "./LoginForm";

const LoginPage: React.FC = () => {

  return (
    <>
      <div className="h-[100vh] w-full overflow-hidden">
        <Header />
        <div className="h-[90vh] w-full mt-[10vh] flex justify-center items-center">
          <Card className="w-full max-w-sm gap-2">
            <CardHeader className="mb-12">
              <CardTitle className="text-xl font-bold">Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <LoginForm />
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;