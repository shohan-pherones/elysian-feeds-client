"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/features/auth/userSlice";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const user = useSelector((state: RootState) => state?.user?.user?.user);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Successfully logged out.");
  }, [dispatch]);

  const navLinks = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/#our-vision">Our Vision</Link>
      </li>
      <li>
        <Link href="/#top-providers">Providers</Link>
      </li>
      <li>
        <Link href="/#top-consumers">Consumers</Link>
      </li>
      {user && user.role === "user" && (
        <li>
          <Link href="/dashboard/user">Dashboard</Link>
        </li>
      )}
      {user && user.role === "providerConnector" && (
        <li>
          <Link href="/dashboard/provider-connector">Dashboard</Link>
        </li>
      )}
      {user && user.role === "consumerConnector" && (
        <li>
          <Link href="/dashboard/consumer-connector">Dashboard</Link>
        </li>
      )}
      {user && user.role === "admin" && (
        <li>
          <Link href="/dashboard/admin">Dashboard</Link>
        </li>
      )}
      <li>
        <Link href="/#gallery">Gallery</Link>
      </li>
      <li>
        <Link href="/#testimonials">Testimonials</Link>
      </li>
    </>
  );

  return (
    <motion.header
      initial={{ y: "-100%" }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="navbar h-16 bg-base-100/80 fixed top-0 left-0 z-[100] shadow-xl border-b border-white/30 backdrop-blur-xl"
    >
      <nav className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Elysian Feeds
        </Link>
      </nav>

      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </nav>

      <nav className="navbar-end gap-3 items-center">
        {user && (
          <div
            className="tooltip tooltip-left tooltip-accent h-12 w-12 group"
            data-tip={user.name}
          >
            <Link href="/profile">
              <Image
                src={user.image}
                alt={user.name}
                width={50}
                height={50}
                priority
                className="w-full h-full object-cover rounded-full"
              />
            </Link>
          </div>
        )}

        {!user && (
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
        )}

        {user && (
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
