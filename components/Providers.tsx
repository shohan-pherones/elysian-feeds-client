"use client";

import useFetch from "@/hooks/useFetch";
import SectionTitle from "./SectionTitle";
import ProviderCard from "./ProviderCard";
import Loading from "./Loading";
import Error from "./Error";

const Providers = () => {
  const { data: providers, error, isLoading } = useFetch("/api/providers/all");

  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Top Providers" />

      {isLoading && <Loading isLoading={isLoading} />}

      {error && <Error error={error.message} />}

      {providers && (
        <div className="flex flex-wrap gap-10 justify-center">
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
            .slice(0, 8)
            .map((prova: any) => (
              <ProviderCard
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
