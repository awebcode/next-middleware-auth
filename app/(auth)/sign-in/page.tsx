"use client";
import { Label } from "@/components/ui/label";
import { SignInAction } from "../actions";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PendingButton from "@/components/PendingButton";
import Heading from "@/components/Heading";
import { useActionState } from "react";

export default function SignInPage() {
  const [data, action, pending] = useActionState(SignInAction, null);


  return (
    <form
      action={action}
      className="space-y-4 my-4 p-4 max-w-md mx-auto border rounded"
    >
      <Heading title="SignIn" desc="SignIn to your account" />
      <div>
        <Label htmlFor="name" className="block mb-1 text-sm font-medium">
          Name
        </Label>
        <Input id="name" name="name" placeholder="Enter your name" type="text" required />
        {data?.error && data.error.name && (
          <p className="text-red-500">{data?.error.name}</p>
        )}
      </div>

      <div>
        <Label htmlFor="role" className="block mb-1 text-sm font-medium">
          Role
        </Label>
        <Select name="role">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              {["ADMIN", "USER"].map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {data?.error && data.error.role && (
          <p className="text-red-500">{data?.error.role}</p>
        )}
      </div>

      <PendingButton isPending={pending}>SignIn</PendingButton>
    </form>
  );
}
