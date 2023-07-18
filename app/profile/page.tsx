"use client";

import { useEffect } from "react";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  const userStore = useSelector((state: RootState) => state.user?.user);
  const router = useRouter();

  useEffect(() => {
    if (!userStore) {
      router.push("/login");
    }
  }, [router, userStore]);

  return (
    <main className="mt-16">
      <section className="wrapper section-padding min-h-screen">
        <SectionTitle title="Profile" />

        {userStore?.user && (
          <div className="flex flex-col sm:flex-row gap-10 justify-center overflow-hidden">
            <motion.div
              initial={{ y: "-100%" }}
              whileInView={{ y: 0 }}
              transition={{ ease: "easeInOut", duration: 1 }}
              className="w-full sm:w-80 h-80 overflow-hidden"
            >
              <Image
                src={userStore?.user?.image}
                alt={userStore?.user?.name}
                width={300}
                height={300}
                priority
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="text-xl flex flex-col gap-2 overflow-hidden">
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0 }}
                className="border-b border-white/30"
              >
                Name: {userStore?.user?.name}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.1 }}
                className="border-b border-white/30"
              >
                Email: {userStore?.user?.email}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.2 }}
                className="border-b border-white/30"
              >
                Phone: {userStore?.user?.phoneNumber}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.3 }}
                className="border-b border-white/30"
              >
                Address: {userStore?.user?.address}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.4 }}
                className="border-b border-white/30"
              >
                Occupation: {userStore?.user?.occupation}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.5 }}
                className="border-b border-white/30"
              >
                Role: {userStore?.user?.role}
              </motion.p>
              <motion.p
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.6 }}
                className="border-b border-white/30"
              >
                Joined:{" "}
                {new Date(userStore?.user?.createdAt)?.toLocaleDateString()}
              </motion.p>
              <motion.div
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                transition={{ ease: "easeInOut", duration: 1, delay: 0.7 }}
                className="mt-3"
              >
                <Link href="/" className="btn btn-secondary">
                  Back to home
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;
