"use client";

import useFetch from "@/hooks/useFetch";
import SectionTitle from "./SectionTitle";
import ProviderCard from "./ProviderCard";
import Loading from "./Loading";
import Error from "./Error";

const Providers = () => {
  const { data: providers, error, isLoading } = useFetch("/api/providers/all");

  return (
    <section id="top-providers" className="wrapper section-padding">
      <SectionTitle title="Top Providers" />

      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}

      {providers && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {providers
            .sort(
              (a: any, b: any) =>
                b.contributions.reduce(
                  (sum: number, contr: any) => (sum += contr.amount),
                  0
                ) -
                a.contributions.reduce(
                  (sum: number, contr: any) => (sum += contr.amount),
                  0
                )
            )
            .map((prova: any, index: number) => (
              <ProviderCard
                index={index}
                key={prova._id}
                address={prova.address}
                contributions={prova.contributions.reduce(
                  (sum: number, contr: any) => (sum += contr.amount),
                  0
                )}
                id={prova._id}
                image={prova.image}
                name={prova.name}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default Providers;
