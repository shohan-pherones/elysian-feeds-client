"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((state: RootState) => state?.user?.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
    }
  }, [router, user]);

  return <main className="mt-16">AdminDashboard</main>;
};

export default AdminDashboard;
