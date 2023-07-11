"use client";

import { useCallback, useState, useEffect } from "react";
import { axiosPost } from "@/lib/axiosPost";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/userSlice";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { RootState } from "@/store/store";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const userStore = useSelector((state: RootState) => state.user?.user);

  useEffect(() => {
    if (userStore?.user) {
      router.push("/profile");
    }
  }, [router, userStore?.user]);

  const handleLogin = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      const data = await axiosPost("/api/users/login", { ...formData });

      if (data) {
        dispatch(login(data));
        router.push("/profile");
        toast.success("Successfully logged in.");

        setFormData({
          email: "",
          password: "",
        });
      }
    },
    [formData, router, dispatch]
  );

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="Login" />

        <div className="flex justify-center">
          <form
            onSubmit={handleLogin}
            className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-300"
          >
            <div className="card-body">
              {/* EMAIL */}
              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  type="email"
                  id="email"
                  placeholder="hello@example.com"
                  className="input input-bordered"
                />
              </div>
              {/* PASSWORD */}
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  type="password"
                  id="password"
                  placeholder="enter your password"
                  className="input input-bordered"
                />
              </div>
              {/* SUBMIT */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Login
                </button>
              </div>
              <div className="form-control">
                <p>
                  {`Don't have an account?`}{" "}
                  <Link
                    href="/register"
                    className="text-accent uppercase hover:underline underline-offset-2"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
