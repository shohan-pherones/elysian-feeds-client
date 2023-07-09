"use client";

import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsEnvelopePaper } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { BiDonateHeart } from "react-icons/bi";
import { FaHandsHelping } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { axiosPatch } from "@/lib/axiosPatch";
import { toast } from "react-hot-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SectionTitle from "@/components/SectionTitle";
import DashboardTab from "@/components/DashboardTab";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import clsx from "clsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [secondLayerCheckposts, setSecondLayerCheckposts] = useState([]);
  const [secondLayerUsers, setSecondLayerUsers] = useState([]);
  const [secondLayerProviders, setSecondLayerProviders] = useState([]);
  const [secondLayerConsumers, setSecondLayerConsumers] = useState([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

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

  const {
    data: dataForUsers,
    error: errorForUsers,
    isLoading: loadingForUsers,
  } = useFetch("/api/users", userStore?.token);

  const {
    data: dataForProviders,
    error: errorForProviders,
    isLoading: loadingForProviders,
  } = useFetch("/api/providers/all");

  const {
    data: dataForConsumers,
    error: errorForConsumers,
    isLoading: loadingForConsumers,
  } = useFetch("/api/consumers/all");

  useEffect(() => {
    if (checkposts) {
      setSecondLayerCheckposts(
        checkposts.filter((checkpost: any) => checkpost.status === "pending")
      );
    }
  }, [checkposts]);

  useEffect(() => {
    if (dataForUsers) {
      setSecondLayerUsers(dataForUsers);
    }
  }, [dataForUsers]);

  useEffect(() => {
    if (dataForProviders) {
      setSecondLayerProviders(dataForProviders);
    }
  }, [dataForProviders]);

  useEffect(() => {
    if (dataForConsumers) {
      setSecondLayerConsumers(dataForConsumers);
    }
  }, [dataForConsumers]);

  const handleCheckpost = useCallback(
    async (
      checkId: string,
      userId: string,
      role: string,
      status: string,
      message: string
    ) => {
      const data = await axiosPatch(
        `/api/users/${userId}`,
        { role, checkId, status },
        userStore?.token
      );

      if (data) {
        setSecondLayerCheckposts(
          secondLayerCheckposts.filter(
            (checkpost: any) => checkpost._id !== checkId
          )
        );
        toast.success(message);
      }
    },
    [userStore?.token, secondLayerCheckposts]
  );

  useEffect(() => {
    const calculateMonthlyData = () => {
      const monthlyData: any = {};

      secondLayerProviders?.forEach((provider: any) => {
        provider?.contributions?.forEach((contribution: any) => {
          const createdAt = new Date(contribution?.createdAt);
          const month: string = createdAt?.toLocaleString("default", {
            month: "short",
          });

          if (!monthlyData[month]) {
            monthlyData[month] = {
              month: month,
              contributions: 0,
              consumptions: 0,
            };
          }

          monthlyData[month].contributions += contribution?.amount;
        });
      });

      secondLayerConsumers?.forEach((consumer: any) => {
        consumer?.consumptions?.forEach((consumption: any) => {
          const createdAt = new Date(consumption?.createdAt);
          const month = createdAt?.toLocaleString("default", {
            month: "short",
          });

          if (!monthlyData[month]) {
            monthlyData[month] = {
              month: month,
              contributions: 0,
              consumptions: 0,
            };
          }

          monthlyData[month].consumptions += consumption?.amount;
        });
      });

      const monthlyDataArray: any[] = Object.values(monthlyData);
      setMonthlyData(monthlyDataArray?.reverse());
    };

    if (secondLayerProviders?.length > 0 && secondLayerConsumers?.length > 0) {
      calculateMonthlyData();
    }
  }, [secondLayerProviders, secondLayerConsumers]);

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
                tabName="dashboard"
                placeholder="Dashboard"
              >
                {<MdDashboard />}
              </DashboardTab>
              <div className="relative">
                <DashboardTab
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  tabName="requests"
                  placeholder="Requests"
                >
                  {<BsEnvelopePaper />}
                </DashboardTab>
                <div
                  className={clsx(
                    "absolute w-7 h-7 rounded-full bg-orange-500 -right-2 -top-2 z-[1] text-white flex justify-center items-center",
                    secondLayerCheckposts?.length > 0 ? "block" : "hidden"
                  )}
                >
                  {secondLayerCheckposts?.length}
                </div>
              </div>
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
            {/* FOR DASHBOARD TAB */}
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-5xl">
                  Welcome back,
                  <span className="text-accent"> {userStore?.user?.name}.</span>
                </h2>
                {/* GRAPH */}
                {monthlyData?.length > 0 && (
                  <div className="mt-10 h-[50rem] bg-black p-10 w-full rounded-xl shadow-2xl">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        width={500}
                        height={300}
                        data={monthlyData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="contributions"
                          stroke="#3AA6B9"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="consumptions"
                          stroke="#FF9EAA"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
            {/* FOR REQUESTS */}
            {activeTab === "requests" && (
              <div>
                <h2 className="text-5xl">
                  Pending Requests: {secondLayerCheckposts.length}
                </h2>
                {/* REQUESTS TABLE */}
                <div className="overflow-x-auto mt-10">
                  {isLoading && <Loading isLoading={isLoading} />}
                  {error && <Error error={error.message} />}
                  {secondLayerCheckposts.length > 0 ? (
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
                        {secondLayerCheckposts.map((checkpost: any) => (
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
                                  handleCheckpost(
                                    checkpost._id,
                                    checkpost.user._id,
                                    checkpost.choice,
                                    "approved",
                                    "Request approved."
                                  )
                                }
                                className="btn btn-accent"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleCheckpost(
                                    checkpost._id,
                                    checkpost.user._id,
                                    "user",
                                    "denied",
                                    "Request denied."
                                  )
                                }
                                className="btn btn-accent"
                              >
                                Deny
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <p className="text-2xl">There is no pending request.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* FOR USERS */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-5xl">
                  Registered Users: {secondLayerUsers.length}
                </h2>
                {/* USERS TABLE */}
                <div className="overflow-x-auto mt-10">
                  {loadingForUsers && <Loading isLoading={loadingForUsers} />}
                  {errorForUsers && <Error error={errorForUsers.message} />}
                  {secondLayerUsers.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Address</th>
                          <th>Role</th>
                          <th>Providers</th>
                          <th>Consumers</th>
                        </tr>
                      </thead>
                      <tbody>
                        {secondLayerUsers.map((user: any) => (
                          <tr key={user._id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <Image
                                      src={user.image}
                                      alt={user.name}
                                      width={50}
                                      height={50}
                                      priority
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">{user.name}</div>
                                  <div className="text-sm opacity-50">
                                    {user.occupation}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td>{user.role}</td>
                            <td>{user.providers?.length}</td>
                            <td>{user.consumers?.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <p className="text-2xl">There is no users.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* FOR PROVIDERS */}
            {activeTab === "providers" && (
              <div>
                <h2 className="text-5xl">
                  All Providers: {secondLayerProviders.length}
                </h2>
                {/* PROVIDERS TABLE */}
                <div className="overflow-x-auto mt-10">
                  {loadingForProviders && (
                    <Loading isLoading={loadingForProviders} />
                  )}
                  {errorForProviders && (
                    <Error error={errorForProviders.message} />
                  )}
                  {secondLayerProviders.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Joined</th>
                          <th>Connector</th>
                          <th>Contributions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {secondLayerProviders.map((provider: any) => (
                          <tr key={provider._id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <Image
                                      src={provider.image}
                                      alt={provider.name}
                                      width={50}
                                      height={50}
                                      priority
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {provider.name}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {provider.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {new Date(
                                provider.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td>{provider.user?.name}</td>
                            <td>
                              {provider.contributions?.reduce(
                                (sum: number, contr: any) =>
                                  (sum += contr?.amount),
                                0
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <p className="text-2xl">There is no providers.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* FOR CONSUMERS */}
            {activeTab === "consumers" && (
              <div>
                <h2 className="text-5xl">
                  All Consumers: {secondLayerConsumers.length}
                </h2>
                {/* CONSUMERS TABLE */}
                <div className="overflow-x-auto mt-10">
                  {loadingForConsumers && (
                    <Loading isLoading={loadingForConsumers} />
                  )}
                  {errorForConsumers && (
                    <Error error={errorForConsumers.message} />
                  )}
                  {secondLayerConsumers.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Joined</th>
                          <th>Connector</th>
                          <th>Consumptions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {secondLayerConsumers.map((consumer: any) => (
                          <tr key={consumer._id}>
                            <td>
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="mask mask-squircle w-12 h-12">
                                    <Image
                                      src={consumer.image}
                                      alt={consumer.name}
                                      width={50}
                                      height={50}
                                      priority
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">
                                    {consumer.name}
                                  </div>
                                  <div className="text-sm opacity-50">
                                    {consumer.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              {new Date(
                                consumer.createdAt
                              ).toLocaleDateString()}
                            </td>
                            <td>{consumer.user?.name}</td>
                            <td>
                              {consumer.consumptions?.reduce(
                                (sum: number, consum: any) =>
                                  (sum += consum?.amount),
                                0
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>
                      <p className="text-2xl">There is no consumers.</p>
                    </div>
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
