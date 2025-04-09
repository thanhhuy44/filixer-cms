import { ApiResponse } from "@/types";
import request from "@/utils/axiosClient";

export const AssetApi = {
  upload: async (file: File): Promise<ApiResponse> => {
    return await request.post(
      "/assets/upload",
      {
        file,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};
