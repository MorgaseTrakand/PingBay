import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components/ui/card";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string,
  labelTitle: string,
  placeholder: string,
  type: string,
  initialValue?: string
};

export const FormRow: React.FC<Props> = ({ error, setValue, labelTitle, placeholder, type, initialValue }) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor={type}>{labelTitle}</Label>
          <div className="grid gap-1">
          <Input
            className={`h-12 ${error ? 'border-red-500 bg-red-50' : '' }`}
            id={type}
            type={type}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            value={initialValue}
            placeholder={placeholder}
            required
          />
          <CardDescription className={`mb-4 leading-none ${error ? 'text-red-500' : 'text-white'}`}>{error}</CardDescription>
        </div>
      </div>
    </>
  )
}