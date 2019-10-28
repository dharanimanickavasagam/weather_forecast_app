import {formatDateTime} from "../../utils/formatDateTime";

let dateTime, dateTimeFormat;

beforeEach(() => {
   dateTime = 1572138608011;
   dateTimeFormat = "dddd, MM-DD-YYYY HH:mm";
});

describe("Testing formatDateTime util", () => {
   test("should return date time in the requested format", () => {
      const result = formatDateTime(dateTime, dateTimeFormat);
      expect(result).toMatch("Saturday, 10-26-2019 21:10")
   });
});