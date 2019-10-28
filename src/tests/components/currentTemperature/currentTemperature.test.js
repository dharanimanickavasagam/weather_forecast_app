import React from "react";
import { shallow, mount } from "enzyme";
import CurrentTemperature from "../../../components/currentTemperature/currentTemperature";
import {
  weatherDetails,
  main,
  weatherTableDetails,
  mockWeatherTableDetails
} from "../../fixures/currentTemperature";
import { kelvinToFahrenheitConverter } from "../../../utils/kelvinToFahrenheitConverter";
import { getCurrentTemperature } from "../../../services/currentTemperatureService";

let wrapper;

jest.mock("../../../utils/kelvinToFahrenheitConverter", () => {
  return { kelvinToFahrenheitConverter: jest.fn(() => 72) };
});

jest.mock("../../../utils/formatDateTime", () => {
  return { formatDateTime: jest.fn(() => "Tuesday, 07-02-2019 19:20") };
});

jest.mock("../../../services/currentTemperatureService", () => ({
  getCurrentTemperature: jest.fn(() =>
    Promise.resolve({
      main: {
        temp: 283.04,
        pressure: 1015,
        humidity: 76,
        temp_min: 279.82,
        temp_max: 285.37
      },
      weather: [
        { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
      ],
      name: "Romeo"
    })
  )
}));

beforeAll(() => {
  window.alert = () => {};
  //leaving the commented ones for my reference
  /*   dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => 1562109736100);
  mockKelvinToFahrenheitConverter = jest.fn().mockImplementationOnce(() => 54);
  CurrentTemperature.prototype.getWeatherDetails = function() {
    return weatherTableDetails;
  }; */
});

beforeEach(() => {
  wrapper = shallow(<CurrentTemperature />);
});

describe("match snapshots with previous ", () => {
  test("match snapshot", () => {
    wrapper.setState({ isLoading: false });
    expect(wrapper).toMatchSnapshot();
  });
});

describe("it should not render the component when isLoading is true", () => {
  test("it should not render weather details when data is loading, isLoading:true", () => {
    wrapper.setState({ isLoading: true });
    expect(wrapper.find("Header")).not.toBe(true);
    expect(wrapper.find("Table")).not.toBe(true);

    expect(wrapper.find(".loading").text()).toBe("Loading...");
    expect(wrapper).toMatchSnapshot();
  });
});

describe("it renders component when isLoading is false", () => {
  test("it should render Header and Table after the data is loaded", () => {
    wrapper.setState({ isLoading: false });

    expect(wrapper.find("Header")).toBeTruthy();
    expect(wrapper.find("Table")).toBeTruthy();
  });

  test("it should render the current city location ", () => {
    wrapper.setState({ isLoading: false });
    wrapper.setState({ cityName: "Detroit" });
    expect(wrapper.find("Header").prop("name")).toEqual("Detroit");
  });

  test("it should render the current city location's weather details with mock data", () => {
    wrapper.setState({ isLoading: false });
    wrapper.setState({ weatherDetails, main });
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find("img").prop("src")).toEqual(
      `http://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`
    );

    expect(wrapper.find(".flexContainer__weather").text()).toBe(`72°F`);

    expect(wrapper.find(".weatherDetails").text()).toBe(
      weatherDetails.description
    );

    expect(wrapper.find("Table").prop("data")).toStrictEqual(
      mockWeatherTableDetails
    );
  });
});

describe("Testing Component methods ", () => {
  test("testing getWeatherDetails() ", () => {
    const currentTemperature = new CurrentTemperature();
    const res = currentTemperature.getWeatherDetails(main);
    expect(kelvinToFahrenheitConverter).toHaveBeenCalled();

    expect(res).toStrictEqual(mockWeatherTableDetails);
  });

  test("testing getCurrentDateAndTime() ", () => {
    const currentTemperature = new CurrentTemperature();
    const res = currentTemperature.getCurrentDateAndTime();
    expect(res).toStrictEqual("Tuesday, 07-02-2019 19:20");
  });
});

describe("testing the method componentDidUpdate", () => {
  test("trigger a componentDidUpdate when the prevProps and the currentProps are different", async () => {
    const wrapper = mount(
      <CurrentTemperature latitude={null} longitude={null} />
    );
    wrapper.setProps({ latitude: 13, longitude: 12 });

    expect(getCurrentTemperature).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
