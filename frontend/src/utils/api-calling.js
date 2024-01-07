import { Constants } from "../config";

const queryGenerator = (queryObj) => {
  console.log(queryObj);
  let query = "?";
  for (let key in queryObj) {
    query += `${key}=${queryObj[key]}&`;
  }
  query = query.slice(0, -1);
  console.log(query);
  return query;
};

export const apiCalling = async (method, route, payload = {}, query = null) => {
  try {
    const URL = `${Constants.BASE_URL}${route}${
      query ? queryGenerator(query) : ""
    }`;
    console.log(URL);
    const res = await fetch(URL, {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        authorization: sessionStorage.getItem("authToken"),
      },
      ...(method.toLowerCase() !== "get"
        ? { body: JSON.stringify(payload) }
        : {}),
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    if (data.token) {
      sessionStorage.setItem("authToken", data.token);
      delete data.token;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
