"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProviderConnectorDashboard = () => {
  const user = useSelector((state: RootState) => state?.user?.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "providerConnector") {
      router.push("/");
    }
  }, [router, user]);

  return <main className="mt-16">ProviderConnectorDashboard</main>;
};

export default ProviderConnectorDashboard;
