"use client";

import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsEnvelopePaper } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { axiosPatch } from "@/lib/axiosPatch";
import { toast } from "react-hot-toast";
import SectionTitle from "@/components/SectionTitle";
import DashboardTab from "@/components/DashboardTab";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("requests");

  const userStore = useSelector((state: RootState) => state.user?.user);

  const router = useRouter();

  useEffect(() => {
    if (userStore?.user?.role !== "admin") {
      router.push("/");
    }
  }, [router, userStore?.user?.role]);

  const {
    data: checkposts,
    error,
    isLoading,
  } = useFetch("/api/checkpost", userStore?.token);

  const handleApprove = useCallback(
    async (checkId: string, userId: string, role: string, status: string) => {
      const data = await axiosPatch(
        `/api/users/${userId}`,
        { role, checkId, status },
        userStore?.token
      );

      if (data) {
        toast.success("Request approved.");
      }
    },
    [userStore?.token]
  );

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="Admin Dashboard" />
        {/* BOARD */}
        <div className="min-h-screen bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/20 grid grid-cols-[20rem_auto]">
          {/* SIDEBAR */}
          <aside className="bg-black flex justify-center p-10">
            <div className="flex flex-col gap-5 justify-start h-fit">
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="requests"
                placeholder="Requests"
              >
                {<BsEnvelopePaper />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="users"
                placeholder="Users"
              >
                {<FiUsers />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="providers"
                placeholder="Providers"
              >
                {<BiDonateHeart />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="consumers"
                placeholder="Consumers"
              >
                {<FaHandsHelping />}
              </DashboardTab>
            </div>
          </aside>
          {/* MAIN CONTENT */}
          <div className="p-10">
            {/* FOR REQUESTS */}
            {activeTab === "requests" && (
              <div>
                <h2 className="text-5xl">
                  Welcome back,
                  <span className="text-accent"> {userStore?.user?.name}.</span>
                </h2>
                {/* REQUESTS TABLE */}
                <div className="overflow-x-auto mt-10">
                  {isLoading && <Loading isLoading={isLoading} />}
                  {error && <Error error={error.message} />}
                  {checkposts && (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Choice</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checkposts
                          .filter(
                            (checkpost: any) => checkpost.status === "pending"
                          )
                          .map((checkpost: any) => (
                            <tr key={checkpost._id}>
                              <td>
                                <div className="flex items-center space-x-3">
                                  <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                      <Image
                                        src={checkpost.user.image}
                                        alt={checkpost.user.name}
                                        width={50}
                                        height={50}
                                        priority
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="font-bold">
                                      {checkpost.user.name}
                                    </div>
                                    <div className="text-sm opacity-50">
                                      {checkpost.user.occupation}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>{checkpost.user.email}</td>
                              <td>{checkpost.choice}</td>
                              <td>
                                {new Date(
                                  checkpost.createdAt
                                ).toLocaleDateString()}
                              </td>
                              <td className="flex gap-5 items-center">
                                <button
                                  onClick={() =>
                                    handleApprove(
                                      checkpost._id,
                                      checkpost.user._id,
                                      checkpost.choice,
                                      "approved"
                                    )
                                  }
                                  className="btn btn-accent"
                                >
                                  Approve
                                </button>
                                <button className="btn btn-accent">Deny</button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
