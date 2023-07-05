"use client";

import useSWR from "swr";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

const useFetch = (path: string) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    fetcher
  );

  const isLoading = !data && !error;

  return { data, error, isLoading };
};

export default useFetch;
