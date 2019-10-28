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

