import http from "../httpAxiosModule/httpAxiosModule";
import url from "../config.json";

export const getCurrentTemperature = async (lat, lon) => {
  const { data } = await http.get(
    `${url.apiEndPoint}/weather?lat=${lat}&lon=${lon}&appid=${url.appid}`
  );
  return data;
};

//test 1

//test 2

//test 3 modified in branch 4

//test 4 comment from branch 4
//test 3 modified in Branch 3

// new comment from Branch 3
