import axios from "axios";
import { toast } from "react-hot-toast";

export const axiosPatch = async (
  endpoint: string,
  data: any,
  token: string = ""
) => {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      return res.data;
    }
  } catch (error: any) {
    toast.error(error.response?.data?.error);
  }
};
