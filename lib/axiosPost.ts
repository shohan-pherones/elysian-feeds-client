import { toast } from "react-hot-toast";
import axios from "axios";

export const axiosPost = async (endpoint: string, data: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      data
    );

    if (res.data) {
      return res.data;
    }
  } catch (error: any) {
    toast.error(error.response?.data?.error);
  }
};
