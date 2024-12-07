"use client";
import { logoutAction } from "@/app/(auth)/actions";
import React from "react";
import PendingButton from "./PendingButton";
import { useUserStore } from "@/hooks/useUser";

const LogoutButton = () => {
    const { setUser } = useUserStore();

  const logout = async () => {
    setUser(null);

    await logoutAction();

  }
  return (
    <form action={logout}>
      <PendingButton variant={"destructive"}>Logout</PendingButton>
    </form>
  );
};

export default LogoutButton;
