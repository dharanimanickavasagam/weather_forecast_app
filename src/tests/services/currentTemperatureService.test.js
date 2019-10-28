import { getCurrentTemperature } from "../../services/currentTemperatureService";
import mockAxios from "../../__mocks__/axios";
import url from "../../config.json";

let lat, lon;

beforeEach(() => {
  lat = 12;
  lon = 12;

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { coord: { lat: 12, lon: 12 } }
    })
  );
});

describe("Testing CurrentTemperatureService", () => {
  test("should get the current Temperature based on the given latitude and longitude values", async () => {
    const result = await getCurrentTemperature(lat, lon);
    expect(result).toMatchObject({ coord: { lat, lon } });
  });

  test("should call the get API once", () => {
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should call the endpoint with the correct latitude and longitude values", () => {
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${url.apiEndPoint}/weather?lat=${lat}&lon=${lon}&appid=${url.appid}`
    );
  });
});
