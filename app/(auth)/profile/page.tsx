import { getUser } from "@/app/(auth)/actions";
import Heading from "@/components/Heading";
import LogoutButton from "@/components/LogoutButton";
import { ROLE } from "@prisma/client";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await getUser();
  return (
    <div className="container flex flex-col">
      {" "}
      <Heading title="Profile" desc={`Welcome ${user?.name}`} />{" "}
      {user?.role === ROLE.ADMIN && (
        <Link href="/admin">Go to Admin</Link>
      )}
      <LogoutButton />
    </div>
  );
};

export default page;
