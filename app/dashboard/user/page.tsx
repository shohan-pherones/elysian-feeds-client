"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { FaEnvelope } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { axiosPost } from "@/lib/axiosPost";
import { toast } from "react-hot-toast";
import { join, updateUser } from "@/features/auth/userSlice";
import SectionTitle from "@/components/SectionTitle";
import DashboardTab from "@/components/DashboardTab";
import useFetch from "@/hooks/useFetch";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("make-request");
  const [formData, setFormData] = useState({
    rating: "",
    body: "",
  });

  const userStore = useSelector((state: RootState) => state?.user?.user);

  const router = useRouter();

  const dispatch = useDispatch();

  const { data: user } = useFetch(
    `/api/users/${userStore?.user?._id}`,
    userStore?.token
  );

  useEffect(() => {
    if (user) {
      dispatch(updateUser(user));
    }

    if (user?.checkpost?.status === "approved") {
      toast.success(`You've been promoted to ${user?.role}.`);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (userStore?.user?.role !== "user") {
      router.push("/");
    }
  }, [router, userStore?.user?.role]);

  const handleRequest = useCallback(
    async (choice: string) => {
      const data = await axiosPost(
        "/api/checkpost",
        { choice },
        userStore?.token
      );

      if (data) {
        dispatch(join(data._id));
        toast.success("Request sent successfully.");
      }
    },
    [dispatch, userStore?.token]
  );

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

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="User Dashboard" />
        {/* BOARD */}
        <div className="min-h-screen bg-black/50 rounded-2xl overflow-hidden shadow-2xl border border-white/20 grid grid-cols-[20rem_auto]">
          {/* SIDEBAR */}
          <aside className="bg-black flex justify-center p-10">
            <div className="flex flex-col gap-5 justify-start h-fit">
              <DashboardTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabName="make-request"
                placeholder="Make Request"
              >
                {<FaEnvelope />}
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
            {/* FOR REQUEST */}
            {activeTab === "make-request" && (
              <div>
                <h2 className="text-5xl">
                  Welcome back,
                  <span className="text-accent"> {userStore?.user?.name}.</span>
                </h2>
                {/* BEFORE SENDING REQ. */}
                {!userStore?.user?.checkpost && (
                  <>
                    <h2 className="mt-10 text-2xl">
                      Which role would you like to take on?{" "}
                    </h2>
                    <div className="mt-3 flex gap-5">
                      <button
                        onClick={() => handleRequest("providerConnector")}
                        className="btn btn-accent"
                      >
                        Provider Connector
                      </button>
                      <button
                        onClick={() => handleRequest("consumerConnector")}
                        className="btn btn-accent"
                      >
                        Consumer Connector
                      </button>
                    </div>
                  </>
                )}
                {/* AFTER SENDING REQ. */}
                {userStore?.user?.checkpost &&
                  userStore?.user?.checkpost?.status !== "pending" &&
                  userStore?.user?.checkpost?.status !== "denied" && (
                    <h2 className="mt-10 text-2xl">
                      Your joining request has been sent successfully.
                    </h2>
                  )}
                {/* PENDING STAGE */}
                {userStore?.user?.checkpost?.status === "pending" && (
                  <h2 className="mt-10 text-2xl">
                    Your joining request is pending.
                  </h2>
                )}
                {/* DENIED STAGE */}
                {userStore?.user?.checkpost?.status === "denied" && (
                  <h2 className="mt-10 text-2xl">
                    Your joining request has been rejected.
                  </h2>
                )}
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
    </main>
  );
};

export default UserDashboard;
