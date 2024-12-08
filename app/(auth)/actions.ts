"use server";
import prisma from "@/lib/prisma";
import { deleteCookie, getCookie, setCookie } from "@/lib/server_utils";
import type { ROLE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const SignInSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  role: z.enum(["USER", "ADMIN"]),
});

type SignInDataType = z.infer<typeof SignInSchema>;

export async function SignInAction(prev: unknown, formData: FormData) {
  const data = Object.fromEntries(formData) as unknown as SignInDataType;
  const parsed = SignInSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, role } = parsed.data;
  let user = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (user) {
    const token = `${user.id}:${role}`;

    // Set the token as a cookie
    await setCookie("auth_token", token);
    revalidatePath("/");
    redirect("/profile");
  }

  user = await prisma.user.create({
    data: {
      name,
      role,
    },
  });

  const token = `${user.id}:${role}`;

  // Set the token as a cookie
  await setCookie("auth_token", token);
  revalidatePath("/");
  redirect("/profile");
}

export async function isAuthorized(roles: ROLE) {
  const cookie = await getCookie("auth_token");
  const role = cookie?.split(":")[1];
  return roles.includes(role || "");
}

export async function getUser() {
  const token = await getCookie("auth_token");
  if (!token) return null;
  const id = token.split(":")[0];
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function logoutAction() {
  await deleteCookie("auth_token");
  revalidatePath("/");
  redirect("/sign-in");
}
