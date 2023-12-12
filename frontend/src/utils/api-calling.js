import axios from "axios";
import { BASE_URL } from "../config/constants";

export const apiCalling = async ( method, route, payload ) => {
  const res = await axios[method](`${BASE_URL}${route}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      ...payload,
    },
    
  });
  return res;
};
