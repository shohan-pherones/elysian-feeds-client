"use client";

import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ConsumerConnectorDashboard = () => {
  const user = useSelector((state: RootState) => state?.user?.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (user.role !== "consumerConnector") {
      router.push("/");
    }
  }, [router, user]);

  return <main className="mt-16">ConsumerConnectorDashboard</main>;
};

export default ConsumerConnectorDashboard;
