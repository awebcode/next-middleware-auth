"use client"
import React from "react";
import { Button, type ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";
interface Props extends ButtonProps {
  className?: string;
  pendingText?: string
  isPending?: boolean
}
const PendingButton = ({ className,pendingText, ...props }: Props) => {
  const { pending } = useFormStatus();
  const PendingOrIsPending=pending || props.isPending
  return (
    <Button {...props} disabled={PendingOrIsPending} className={className}>
      {PendingOrIsPending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" /> {pendingText}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
};

export default PendingButton;
