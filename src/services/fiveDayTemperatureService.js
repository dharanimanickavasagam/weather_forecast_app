import http from "../httpAxiosModule/httpAxiosModule";
import url from "../config.json";

export const getFiveDayTemperature = async (lat, lon) => {
  const { data } = await http.get(
    `${url.apiEndPoint}/forecast?lat=${lat}&lon=${lon}&appid=${url.appid}`
  );
  return data;
};

//test 4

//test 5
