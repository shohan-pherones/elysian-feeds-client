"use client";

import { useEffect } from "react";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const userStore = useSelector((state: RootState) => state.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (!userStore) {
      router.push("/login");
    }
  }, [router, userStore]);

  return <main className="mt-16">ProfilePage</main>;
};

export default ProfilePage;
