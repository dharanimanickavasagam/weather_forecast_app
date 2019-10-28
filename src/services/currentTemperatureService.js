import http from "../httpAxiosModule/httpAxiosModule";
import url from "../config.json";

export const getCurrentTemperature = async (lat, lon) => {
  const { data } = await http.get(
    `${url.apiEndPoint}/weather?lat=${lat}&lon=${lon}&appid=${url.appid}`
  );
  return data;
};
