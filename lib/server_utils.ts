"use server";
import { cookies } from "next/headers";

export const getCookie = async (name: string) => {
  const cookie = (await cookies()).get(name)?.value;
  return cookie;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete({
    name,
    httpOnly: true,
    secure: true,
    path: "/",
  });
};
