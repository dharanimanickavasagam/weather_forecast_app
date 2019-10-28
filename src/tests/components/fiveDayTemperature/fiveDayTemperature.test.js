import React from "react";
import { shallow, mount } from "enzyme";
import Header from "../../../components/common/header";
import Table from "../../../components/common/table";
import FiveDayTemperature from "../../../components/fiveDayTemperature/fiveDayTemperature";
import { data } from "../../fixures/fiveDayTemperature";

let wrapper, jsdomAlert;

beforeEach(() => {
  wrapper = shallow(<FiveDayTemperature />);
});

beforeAll(() => {
  jsdomAlert = window.alert;
  window.alert = () => {};
});

describe("it renders correctly", () => {
  test("it should render ", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("it displays the 5day forecast", () => {
  test("it should render Header and Table after the data is loaded", () => {
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<Table />)).toEqual(true);
  });

  test("it should render the cityname in the header", () => {
    wrapper.setState({ cityName: "Detroit" });
    expect(wrapper.find("Header").prop("name")).toEqual("Detroit");
  });

  test("it should render the table with the forecast data", () => {
    wrapper.setState({ data });
    expect(wrapper.find("Table").prop("data")).toEqual(data);
  });
});

describe("testing the method componentDidUpdate", () => {
  it("trigger a componentDidUpdate when the prevProps and the currentProps are different", async () => {
    const mockReturnValue = {
      city: "Detroit",
      list: [
        {
          dt: 1572188400,
          main: {
            temp: 285.49,
            temp_min: 285.49,
            temp_max: 285.86,
            pressure: 1002,
            sea_level: 1002,
            grnd_level: 972,
            humidity: 86,
            temp_kf: -0.37
          },
          weather: [
            { id: 500, main: "Rain", description: "light rain", icon: "10d" }
          ],
          clouds: { all: 98 },
          wind: { speed: 10.92, deg: 269 },
          rain: { "3h": 0.5 },
          sys: { pod: "d" },
          dt_txt: "2019-10-27 15:00:00"
        }
      ]
    };
    const getFiveDayTemperature = jest
      .fn()
      .mockReturnValue(() => mockReturnValue);

    const prevProps = {
      latitude: null,
      longitude: null
    };

    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<FiveDayTemperature {...prevProps} />);
    wrapper.setProps({ latitude: 12, longitude: 12 });

    //expect(getFiveDayTemperature).toHaveBeenCalled();

    // const mockGetFiveDayTemperatureAtCurrentLocation = jest.fn();
    // FiveDayTemperature.prototype.getFiveDayTemperatureAtCurrentLocation = mockGetFiveDayTemperatureAtCurrentLocation.mockResolvedValue(
    //   () => wrapper.setState({ cityName: "Detroit", data: mockData })
    // );

    // expect(wrapper).toMatchSnapshot();
    // mockGetFiveDayTemperatureAtCurrentLocation();
    // expect(mockGetFiveDayTemperatureAtCurrentLocation).toHaveBeenCalled();
  });
});
