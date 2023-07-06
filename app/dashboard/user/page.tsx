"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

const UserDashboard = () => {
  const user = useSelector((state: RootState) => state?.user?.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "user") {
      router.push("/");
    }
  }, [router, user]);

  return <main className="mt-16">UserDashboard</main>;
};

export default UserDashboard;
