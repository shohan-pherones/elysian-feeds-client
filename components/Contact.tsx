"use client";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault();

    /* EMAIL JS */
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        formRef.current as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID as string
      )
      .then(
        () => {
          toast.success("Your message has been successfully sent.");
          /* FIELD RESET */
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        () => {
          toast.error("Your message could not be sent successfully.");
        }
      );
  }, []);

  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Need help? Contact us" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 overflow-hidden">
        <motion.div
          className="w-full h-[30rem] overflow-hidden rounded-xl"
          initial={{ x: "-100%" }}
          whileInView={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <Image
            src="https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Man Pushing an Elderly Man on a Black Wheelchair"
            width={720}
            height={1280}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.form
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 order-first md:order-last"
        >
          <p>
            If you require assistance or have any questions, please feel free to
            send us a message.
          </p>
          <div className="form-control flex flex-col gap-1">
            <label htmlFor="name" className="cursor-pointer">
              Name
            </label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              placeholder="Sarah Parker"
              required
              minLength={3}
              id="name"
              name="fullname"
              className="bg-transparent border outline-none rounded-xl px-4 py-3 border-white/30 focus:border-accent duration-300"
            />
          </div>
          <div className="form-control flex flex-col gap-1">
            <label htmlFor="email" className="cursor-pointer">
              Email
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              name="email"
              placeholder="hello@example.com"
              required
              id="email"
              className="bg-transparent border outline-none rounded-xl px-4 py-3 border-white/30 focus:border-accent duration-300"
            />
          </div>
          <div className="form-control flex flex-col gap-1">
            <label htmlFor="message" className="cursor-pointer">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Write your message here..."
              required
              id="message"
              name="message"
              rows={5}
              className="bg-transparent border outline-none rounded-xl px-4 py-3 border-white/30 focus:border-accent duration-300 resize-none"
            />
          </div>
          <button className="btn btn-accent" type="submit">
            Submit
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
