"use client";

import useFetch from "@/hooks/useFetch";
import ConsumerCard from "./ConsumerCard";
import SectionTitle from "./SectionTitle";
import Loading from "./Loading";
import Error from "./Error";

const Consumers = () => {
  const { data: consumers, error, isLoading } = useFetch("/api/consumers/all");

  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Top Consumers" />

      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}

      {consumers && (
        <div className="flex flex-wrap gap-10 justify-center">
          {consumers
            .sort(
              (a: any, b: any) =>
                b.consumptions.reduce(
                  (sum: number, consum: any) => (sum += consum.amount),
                  0
                ) -
                a.consumptions.reduce(
                  (sum: number, consum: any) => (sum += consum.amount),
                  0
                )
            )
            .slice(0, 8)
            .map((consumer: any) => (
              <ConsumerCard
                key={consumer._id}
                address={consumer.address}
                consumptions={consumer.consumptions.reduce(
                  (sum: number, consum: any) => (sum += consum.amount),
                  0
                )}
                id={consumer._id}
                image={consumer.image}
                name={consumer.name}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default Consumers;
