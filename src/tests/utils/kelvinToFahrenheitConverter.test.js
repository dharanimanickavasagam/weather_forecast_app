import {kelvinToFahrenheitConverter} from "../../utils/kelvinToFahrenheitConverter";

let kelvinTemperature;

beforeEach(() => {
   kelvinTemperature = 286.4;
});

describe("Testing kelvinToFahrenheitConverter util", () => {
   test("should return temperature in Fahrenheit for a given input in kelvin", () => {
      const result = kelvinToFahrenheitConverter(kelvinTemperature);
      expect(result).toBe(56);
   });
});