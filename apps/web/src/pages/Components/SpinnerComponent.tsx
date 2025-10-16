import type React from "react";
import { Loader2 } from "lucide-react";

type Props = {
  loading: boolean
};

export const SpinnerComponent: React.FC<Props> = ({ loading }) => {

  return (
    <>
      {loading && (
        <div
          role="status"
          aria-busy="true"
          className="rounded-xl absolute inset-0 z-30 flex items-center justify-center bg-white/60 dark:bg-black/50 backdrop-blur-sm"
        >
          <Loader2 className="animate-spin w-10 h-10 text-primary" />
        </div>
      )}
    </>
  )
}