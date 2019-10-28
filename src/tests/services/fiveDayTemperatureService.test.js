import { getFiveDayTemperature } from "../../services/fiveDayTemperatureService";
import mockAxios from "../../__mocks__/axios";
import url from "../../config.json";

let lat, lon;

beforeEach(() => {
  lat = 12;
  lon = 12;

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { city: { coord: { lat: 12, lon: 12 } } }
    })
  );
});

describe("Testing FiveDayTemperatureService", () => {
  test("should get the 5day forecast based on the given latitude and longitude values", async () => {
    const result = await getFiveDayTemperature(lat, lon);
    expect(result).toMatchObject({ city: { coord: { lat, lon } } });
  });

  test("should call the get API once", () => {
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  test("should call the endpoint with the correct latitude and longitude values", () => {
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${url.apiEndPoint}/forecast?lat=${lat}&lon=${lon}&appid=${url.appid}`
    );
  });
});
