"use client";

import { motion } from "framer-motion";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SectionTitle from "@/components/SectionTitle";
import useFetch from "@/hooks/useFetch";

const ConsumerDetailsPage = ({ params }: { params: { cid: string } }) => {
  const {
    data: consumer,
    isLoading,
    error,
  } = useFetch(`/api/consumers/all/${params.cid}`);

  return (
    <main className="mt-16">
      {isLoading && (
        <div className="wrapper section-padding min-h-screen">
          <Loading isLoading={isLoading} />
        </div>
      )}

      {error && (
        <div className="wrapper section-padding min-h-screen">
          <Error error={error.message} />
        </div>
      )}

      {consumer && (
        <section className="min-h-screen">
          {/* BG */}
          <div
            className="h-[60vh] bg-no-repeat bg-center bg-cover bg-fixed flex justify-center items-center"
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${consumer.image})`,
            }}
          >
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className="text-4xl md:text-8xl font-bold uppercase text-white wrapper text-center"
              >
                {consumer.name}
              </motion.h2>
            </div>
          </div>
          {/* CONTENTS */}
          <div className="wrapper section-padding text-xl">
            <SectionTitle title="Consumer Details" />
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-10 mb-10">
              {/* LEFT */}
              <div className="flex flex-col gap-2 overflow-hidden">
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0 }}
                  className="border-b border-white/30"
                >
                  Consumer Name: {consumer.name}
                </motion.p>
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0.1 }}
                  className="border-b border-white/30"
                >
                  Total Consumptions:{" "}
                  {consumer.consumptions?.reduce(
                    (sum: number, consum: any) => (sum += consum?.amount),
                    0
                  )}
                </motion.p>
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0.2 }}
                  className="border-b border-white/30"
                >
                  Address: {consumer.address}
                </motion.p>
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0.3 }}
                  className="border-b border-white/30"
                >
                  Created: {new Date(consumer.createdAt).toLocaleDateString()}
                </motion.p>
              </div>
              {/* RIGHT */}
              <div className="flex flex-col gap-2 overflow-hidden">
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0 }}
                  className="border-b border-white/30"
                >
                  Consumer Connector: {consumer.user?.name}
                </motion.p>
                <motion.p
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  transition={{ ease: "easeIn", duration: 1, delay: 0.1 }}
                  className="border-b border-white/30"
                >
                  Occupation: {consumer.user?.occupation}
                </motion.p>
              </div>
            </div>
            <SectionTitle title="Consumptions" />
            {/* CONSUMPTIONS TABLE */}
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Amount (Unit)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {consumer.consumptions?.map((consum: any, i: number) => (
                    <tr key={consum._id}>
                      <th>{i + 1}</th>
                      <td>{consum.name}</td>
                      <td>{consum.amount}</td>
                      <td>
                        {new Date(consum.createdAt)?.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ConsumerDetailsPage;
