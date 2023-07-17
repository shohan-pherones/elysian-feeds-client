"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { MdDashboard, MdCreateNewFolder } from "react-icons/md";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { axiosPost } from "@/lib/axiosPost";
import { IoIosCreate, IoMdClose } from "react-icons/io";
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
import DashboardTab from "@/components/DashboardTab";
import SectionTitle from "@/components/SectionTitle";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Image from "next/image";
import clsx from "clsx";

const ConsumerConnectorDashboard = () => {
  const [selectedConsumer, setSelectedConsumer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [secondLayerConsumers, setSecondLayerConsumers] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    rating: "",
    body: "",
  });
  const [formDataConsumer, setFormDataConsumer] = useState({
    name: "",
    image: "",
    address: "",
  });
  const [formDataConsumption, setFormDataConsumption] = useState({
    name: "",
    amount: "",
  });

  const userStore = useSelector((state: RootState) => state?.user?.user);

  const router = useRouter();

  useEffect(() => {
    if (userStore?.user.role !== "consumerConnector") {
      router.push("/");
    }
  }, [router, userStore?.user.role]);

  const {
    data: dataForConsumers,
    error: errorForConsumers,
    isLoading: loadingForConsumers,
  } = useFetch("/api/consumers", userStore?.token);

  useEffect(() => {
    if (dataForConsumers) {
      setSecondLayerConsumers(dataForConsumers);
    }
  }, [dataForConsumers]);

  const handleCreateReview = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      const data = await axiosPost(
        "/api/reviews",
        { ...formData },
        userStore?.token
      );

      if (data) {
        toast.success("Review created successfully.");
      }

      setFormData({
        rating: "",
        body: "",
      });
    },
    [formData, userStore?.token]
  );

  const handleCreateConsumer = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (
        !formDataConsumer.image.startsWith(
          "https://images.pexels.com" || "https://images.unsplash.com"
        )
      ) {
        toast.error("Paste any image link from pexels or unsplash.");
        return;
      }

      const data = await axiosPost(
        "/api/consumers",
        { ...formDataConsumer },
        userStore?.token
      );

      if (data) {
        setSecondLayerConsumers([data, ...secondLayerConsumers]);
        toast.success("Consumer created successfully.");
      }

      setFormDataConsumer({
        name: "",
        image: "",
        address: "",
      });
    },
    [formDataConsumer, userStore?.token, secondLayerConsumers]
  );

  const handleContribute = (cid: string) => {
    setIsModalOpen(true);
    setSelectedConsumer(cid);
  };

  const handleSubmitConsumption = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = await axiosPost(
      `/api/consumers/${selectedConsumer}`,
      { ...formDataConsumption },
      userStore?.token
    );

    if (data) {
      setSecondLayerConsumers(
        secondLayerConsumers.map((con: any) =>
          con._id === selectedConsumer
            ? { ...con, consumptions: [...con.consumptions, data] }
            : con
        )
      );
      setIsModalOpen(false);
      toast.success("Consumption created successfully.");
    }

    setFormDataConsumption({
      name: "",
      amount: "",
    });
  };

  useEffect(() => {
    const calculateMonthlyData = () => {
      const monthlyData: any = {};

      secondLayerConsumers?.forEach((consumer: any) => {
        consumer?.consumptions?.forEach((consumption: any) => {
          const createdAt = new Date(consumption?.createdAt);
          const month = createdAt?.toLocaleString("default", {
            month: "short",
          });

          if (!monthlyData[month]) {
            monthlyData[month] = {
              month: month,
              consumptions: 0,
            };
          }

          monthlyData[month].consumptions += consumption?.amount;
        });
      });

      const monthlyDataArray: any[] = Object.values(monthlyData);
      setMonthlyData(monthlyDataArray?.reverse());
    };

    if (secondLayerConsumers?.length > 0) {
      calculateMonthlyData();
    }
  }, [secondLayerConsumers]);

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="Consumer Connector Dashboard" />
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
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="consumers"
                placeholder="Consumers"
              >
                {<LiaHandsHelpingSolid />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="create-consumer"
                placeholder="Create Consumer"
              >
                {<MdCreateNewFolder />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="create-review"
                placeholder="Create Review"
              >
                {<IoIosCreate />}
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
                          dataKey="consumptions"
                          stroke="#FF9EAA"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
            {/* FOR SPECIFIC USER'S CONSUMERS */}
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
                          <th>Consumptions</th>
                          <th>Action</th>
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
                                      src={consumer?.image}
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
                            <td>
                              {consumer.consumptions?.reduce(
                                (sum: number, con: any) => (sum += con?.amount),
                                0
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => handleContribute(consumer._id)}
                                className="btn btn-accent"
                              >
                                Consume
                              </button>
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
            {/* FOR CREATE CONSUMER*/}
            {activeTab === "create-consumer" && (
              <div>
                <h2 className="text-5xl">Create a Consumer</h2>
                {/* CONSUMER FORM */}
                <form
                  onSubmit={handleCreateConsumer}
                  className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-300 mt-10"
                >
                  <div className="card-body">
                    {/* NAME */}
                    <div className="form-control">
                      <label htmlFor="name" className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        required
                        value={formDataConsumer.name}
                        onChange={(e) =>
                          setFormDataConsumer({
                            ...formDataConsumer,
                            name: e.target.value,
                          })
                        }
                        type="text"
                        id="name"
                        placeholder="Puran Dhaka Youth Club"
                        className="input input-bordered"
                      />
                    </div>
                    {/* IMAGE */}
                    <div className="form-control">
                      <label htmlFor="image" className="label">
                        <span className="label-text">ImageURL</span>
                      </label>
                      <input
                        required
                        value={formDataConsumer.image}
                        onChange={(e) =>
                          setFormDataConsumer({
                            ...formDataConsumer,
                            image: e.target.value,
                          })
                        }
                        type="text"
                        id="image"
                        placeholder="paste any image from https://www.pexels.com"
                        className="input input-bordered"
                      />
                    </div>
                    {/* ADDRESS */}
                    <div className="form-control">
                      <label htmlFor="address" className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <input
                        required
                        value={formDataConsumer.address}
                        onChange={(e) =>
                          setFormDataConsumer({
                            ...formDataConsumer,
                            address: e.target.value,
                          })
                        }
                        type="text"
                        id="address"
                        placeholder="Dhaka, Bangladesh"
                        className="input input-bordered"
                      />
                    </div>
                    {/* SUBMIT */}
                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-accent">
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {/* FOR  REVIEW*/}
            {activeTab === "create-review" && (
              <div>
                <h2 className="text-5xl">Create a Review</h2>
                {/* REVIEW FORM */}
                <form
                  onSubmit={handleCreateReview}
                  className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-300 mt-10"
                >
                  <div className="card-body">
                    {/* RATING */}
                    <div className="form-control">
                      <label htmlFor="rating" className="label">
                        <span className="label-text">Rating</span>
                      </label>
                      <input
                        required
                        value={formData.rating}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: e.target.value })
                        }
                        type="number"
                        id="rating"
                        placeholder="5"
                        className="input input-bordered"
                      />
                    </div>
                    {/* BODY */}
                    <div className="form-control">
                      <label htmlFor="body" className="label">
                        <span className="label-text">Body</span>
                      </label>
                      <textarea
                        required
                        value={formData.body}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            body: e.target.value,
                          })
                        }
                        rows={8}
                        id="body"
                        placeholder="write your review"
                        className="textarea textarea-bordered resize-none"
                      />
                    </div>
                    {/* SUBMIT */}
                    <div className="form-control mt-6">
                      <button type="submit" className="btn btn-accent">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* MODAL TEMPLATE */}
      <div
        onClick={() => setIsModalOpen(false)}
        className={clsx(
          "fixed z-[101] bg-transparent top-0 left-0 right-0 bottom-0",
          isModalOpen ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "fixed z-[102] bottom-20 right-60 w-[25rem] h-[25rem] rounded-xl bg-base-300 shadow-2xl duration-500 p-7",
          isModalOpen ? "translate-y-0" : "translate-y-[100vh]"
        )}
      >
        {/* UPPER CONTENTS */}
        <div className="flex justify-between items-center text-2xl">
          <h4>Create Consumption</h4>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-rose-500/60 h-10 w-10 bg-rose-500/10 rounded-full flex justify-center items-center hover:text-rose-500 hover:bg-rose-500/30 duration-300"
          >
            <IoMdClose />
          </button>
        </div>
        {/* CONSUMPTION FORM */}
        <form
          onSubmit={handleSubmitConsumption}
          className="card flex-shrink-0 w-full mt-10"
        >
          <div className="card-body p-0">
            {/* NAME */}
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                required
                value={formDataConsumption.name}
                onChange={(e) =>
                  setFormDataConsumption({
                    ...formDataConsumption,
                    name: e.target.value,
                  })
                }
                type="text"
                id="name"
                placeholder="Biriyani"
                className="input input-bordered"
              />
            </div>
            {/* AMOUNT */}
            <div className="form-control">
              <label htmlFor="amount" className="label">
                <span className="label-text">Amount (any unit)</span>
              </label>
              <input
                required
                value={formDataConsumption.amount}
                onChange={(e) =>
                  setFormDataConsumption({
                    ...formDataConsumption,
                    amount: e.target.value,
                  })
                }
                type="number"
                id="amount"
                placeholder="100"
                className="input input-bordered"
              />
            </div>
            {/* SUBMIT */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent">
                Consume
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ConsumerConnectorDashboard;
