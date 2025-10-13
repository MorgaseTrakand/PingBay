import type React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string,
  labelTitle: string,
  placeholder: string,
  type: string,
  initialValue?: string,
  passwordRowBoolean?: boolean
};

export const FormRow: React.FC<Props> = ({ error, setValue, labelTitle, placeholder, type, initialValue, passwordRowBoolean }) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [inputType, setInputType] = useState(type);

  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor={type}>{labelTitle}</Label>
          <div className="grid gap-1">
          <div className="flex relative">
            <Input
              className={`h-12 ${error ? 'border-red-500 bg-red-50' : '' }`}
              id={type}
              type={inputType}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              value={initialValue}
              placeholder={placeholder}
              required
            />
            {passwordRowBoolean && !passwordHidden && 
              <Eye 
                onClick={() => 
                  {
                    setPasswordHidden(!passwordHidden); 
                    setInputType(inputType == 'password' ? 'text' : 'password');
                  }} 
                size="20" 
                className="absolute right-2 top-[50%] translate-y-[-50%] text-muted-foreground cursor-pointer"
              />
            }
            {passwordRowBoolean && passwordHidden && 
              <EyeOff 
                onClick={() => 
                  {
                    setPasswordHidden(!passwordHidden);
                    setInputType(inputType == 'password' ? 'text' : 'password');
                  }} 
                size="20" 
                className="absolute right-2 top-[50%] translate-y-[-50%] text-muted-foreground cursor-pointer"
              />
            }
          </div>
          <CardDescription className={`mb-4 leading-none ${error ? 'text-red-500' : 'text-white'}`}>{error}</CardDescription>
        </div>
      </div>
    </>
  )
}