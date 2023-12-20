import axios from "axios";
import { Constants } from "../config";

export const apiCalling = async (method, route, payload) => {
  try {
    const res = await axios[method](`${Constants.BASE_URL}${route}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionStorage.getItem("authToken"),
      },
    });
    const { data } = res;
    if (data.token) {
      sessionStorage.setItem("authToken", data.token);
      delete data.token;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
