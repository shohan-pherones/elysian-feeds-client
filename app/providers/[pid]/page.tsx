"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import SectionTitle from "@/components/SectionTitle";
import useFetch from "@/hooks/useFetch";

const ProviderDetailsPage = ({ params }: { params: { pid: string } }) => {
  const {
    data: provider,
    isLoading,
    error,
  } = useFetch(`/api/providers/all/${params.pid}`);

  console.log(provider);

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

      {provider && (
        <section className="min-h-screen">
          {/* BG */}
          <div
            className="h-[60vh] bg-no-repeat bg-center bg-cover bg-fixed flex justify-center items-center"
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${provider.image})`,
            }}
          >
            <h2 className="text-4xl md:text-8xl font-bold uppercase text-white wrapper text-center">
              {provider.name}
            </h2>
          </div>
          {/* CONTENTS */}
          <div className="wrapper section-padding">
            <SectionTitle title="Provider Details" />
            <div className="grid grid-cols-2 gap-10">
              <div></div>
              <div></div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProviderDetailsPage;
