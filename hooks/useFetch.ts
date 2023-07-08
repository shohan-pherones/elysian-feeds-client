"use client";

import useSWR from "swr";

const fetcher = async (url: string, token: string = "") => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};

const useFetch = (path: string, token: string = "") => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}${path}`,
    (url) => fetcher(url, token)
  );

  const isLoading = !data && !error;

  return { data, error, isLoading };
};

export default useFetch;
