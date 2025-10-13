import type React from "react";

type Props = {
  text: string
  marginBottom?: number
};

export const PageH1: React.FC<Props> = ({ text, marginBottom = 0 }) => {

  return (
    <>
      <h1 className={`text-2xl sm:text-3xl font-semibold tracking-tight text-foreground mb-${marginBottom}`}>
        {text}
      </h1>
    </>
  )
}