"use client";

import { useCallback, useState, useEffect } from "react";
import { axiosPost } from "@/lib/axiosPost";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/features/auth/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { RootState } from "@/store/store";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    image: "",
    address: "",
    occupation: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const userStore = useSelector((state: RootState) => state.user?.user);

  useEffect(() => {
    if (userStore?.user) {
      router.push("/profile");
    }
  }, [router, userStore?.user]);

  const handleRegister = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();

      if (
        !formData.image.startsWith(
          "https://images.pexels.com" || "https://images.unsplash.com"
        )
      ) {
        toast.error("Paste any image link from pexels or unsplash.");
        return;
      }

      const data = await axiosPost("/api/users/register", { ...formData });

      if (data) {
        dispatch(login(data));
        router.push("/profile");
        toast.success("Successfully registered.");

        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          password: "",
          image: "",
          address: "",
          occupation: "",
        });
      }
    },
    [formData, router, dispatch]
  );

  return (
    <main className="mt-16">
      <section className="wrapper section-padding">
        <SectionTitle title="Register" />

        <div className="flex justify-center">
          <form
            onSubmit={handleRegister}
            className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-300"
          >
            <div className="card-body">
              {/* NAME */}
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  id="name"
                  placeholder="Sarah"
                  className="input input-bordered"
                />
              </div>
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
              {/* PHONE NUMBER */}
              <div className="form-control">
                <label htmlFor="phoneNumber" className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  required
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  type="tel"
                  id="phoneNumber"
                  placeholder="+8801711445566"
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
              {/* IMAGE */}
              <div className="form-control">
                <label htmlFor="image" className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  type="text"
                  id="image"
                  placeholder="paste any image link from pexels or unsplash"
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
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  type="text"
                  id="address"
                  placeholder="Dhaka, Bangladesh"
                  className="input input-bordered"
                />
              </div>
              {/* OCCUPATION */}
              <div className="form-control">
                <label htmlFor="occupation" className="label">
                  <span className="label-text">Occupation</span>
                </label>
                <input
                  required
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData({ ...formData, occupation: e.target.value })
                  }
                  type="text"
                  id="occupation"
                  placeholder="Teacher"
                  className="input input-bordered"
                />
              </div>
              {/* SUBMIT */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent">
                  Create account
                </button>
              </div>
              <div className="form-control">
                <p>
                  {`Already have an account?`}{" "}
                  <Link
                    href="/login"
                    className="text-accent uppercase hover:underline underline-offset-2"
                  >
                    Login
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

export default RegisterPage;
