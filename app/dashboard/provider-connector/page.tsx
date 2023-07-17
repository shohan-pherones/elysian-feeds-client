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

const ProviderConnectorDashboard = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [secondLayerProviders, setSecondLayerProviders] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    rating: "",
    body: "",
  });
  const [formDataProvider, setFormDataProvider] = useState({
    name: "",
    image: "",
    address: "",
  });
  const [formDataContribution, setFormDataContribution] = useState({
    name: "",
    amount: "",
  });

  const userStore = useSelector((state: RootState) => state?.user?.user);

  const router = useRouter();

  useEffect(() => {
    if (userStore?.user.role !== "providerConnector") {
      router.push("/");
    }
  }, [router, userStore?.user.role]);

  const {
    data: dataForProviders,
    error: errorForProviders,
    isLoading: loadingForProviders,
  } = useFetch("/api/providers", userStore?.token);

  useEffect(() => {
    if (dataForProviders) {
      setSecondLayerProviders(dataForProviders);
    }
  }, [dataForProviders]);

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

  const handleCreateProvider = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (
        !formDataProvider.image.startsWith(
          "https://images.pexels.com" || "https://images.unsplash.com"
        )
      ) {
        toast.error("Paste any image link from pexels or unsplash.");
        return;
      }

      const data = await axiosPost(
        "/api/providers",
        { ...formDataProvider },
        userStore?.token
      );

      if (data) {
        setSecondLayerProviders([data, ...secondLayerProviders]);
        toast.success("Provider created successfully.");
      }

      setFormDataProvider({
        name: "",
        image: "",
        address: "",
      });
    },
    [formDataProvider, userStore?.token, secondLayerProviders]
  );

  const handleContribute = (pid: string) => {
    setIsModalOpen(true);
    setSelectedProvider(pid);
  };

  const handleSubmitContribution = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = await axiosPost(
      `/api/providers/${selectedProvider}`,
      { ...formDataContribution },
      userStore?.token
    );

    if (data) {
      setSecondLayerProviders(
        secondLayerProviders.map((prova: any) =>
          prova._id === selectedProvider
            ? { ...prova, contributions: [...prova.contributions, data] }
            : prova
        )
      );
      setIsModalOpen(false);
      toast.success("Contribution created successfully.");
    }

    setFormDataContribution({
      name: "",
      amount: "",
    });
  };

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
            };
          }

          monthlyData[month].contributions += contribution?.amount;
        });
      });

      const monthlyDataArray: any[] = Object.values(monthlyData);
      setMonthlyData(monthlyDataArray?.reverse());
    };

    if (secondLayerProviders?.length > 0) {
      calculateMonthlyData();
    }
  }, [secondLayerProviders]);

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="Provider Connector Dashboard" />
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
                tabName="providers"
                placeholder="Providers"
              >
                {<LiaHandsHelpingSolid />}
              </DashboardTab>
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="create-provider"
                placeholder="Create Provider"
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
                          dataKey="contributions"
                          stroke="#3AA6B9"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}
            {/* FOR SPECIFIC USER'S PROVIDERS */}
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
                          <th>Contributions</th>
                          <th>Action</th>
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
                                      src={provider?.image}
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
                            <td>
                              {provider.contributions?.reduce(
                                (sum: number, contr: any) =>
                                  (sum += contr?.amount),
                                0
                              )}
                            </td>
                            <td>
                              <button
                                onClick={() => handleContribute(provider._id)}
                                className="btn btn-accent"
                              >
                                Contribute
                              </button>
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
            {/* FOR CREATE PROVIDER*/}
            {activeTab === "create-provider" && (
              <div>
                <h2 className="text-5xl">Create a Provider</h2>
                {/* PROVIDER FORM */}
                <form
                  onSubmit={handleCreateProvider}
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
                        value={formDataProvider.name}
                        onChange={(e) =>
                          setFormDataProvider({
                            ...formDataProvider,
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
                        value={formDataProvider.image}
                        onChange={(e) =>
                          setFormDataProvider({
                            ...formDataProvider,
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
                        value={formDataProvider.address}
                        onChange={(e) =>
                          setFormDataProvider({
                            ...formDataProvider,
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
          <h4>Create Contribution</h4>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-rose-500/60 h-10 w-10 bg-rose-500/10 rounded-full flex justify-center items-center hover:text-rose-500 hover:bg-rose-500/30 duration-300"
          >
            <IoMdClose />
          </button>
        </div>
        {/* CONTRIBUTION FORM */}
        <form
          onSubmit={handleSubmitContribution}
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
                value={formDataContribution.name}
                onChange={(e) =>
                  setFormDataContribution({
                    ...formDataContribution,
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
                value={formDataContribution.amount}
                onChange={(e) =>
                  setFormDataContribution({
                    ...formDataContribution,
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
                Contribute
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProviderConnectorDashboard;
