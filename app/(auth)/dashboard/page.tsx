import { getUser, isAuthorized } from "@/app/(auth)/actions";
import Heading from "@/components/Heading";
import LogoutButton from "@/components/LogoutButton";
import { ROLE } from "@prisma/client";
import Link from "next/link";

const page = async () => {
  const authorized =await isAuthorized(ROLE.ADMIN);
  const user = await getUser();

  if (!authorized) {
    return <p>Access Denied</p>;
  }
  return (
    <div className="container flex flex-col">
      {" "}
      <Heading title="Dashboard" desc={`Welcome ${user?.name} in your Dashboard`} />
      <Link href="/profile">Go to Profile</Link>
      <LogoutButton />
    </div>
  );
};

export default page;
