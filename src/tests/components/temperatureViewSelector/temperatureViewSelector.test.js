import React from "react";
import { shallow } from "enzyme";
import TemperatureViewSelector from "../../../components/temperatureViewSelector/temperatureViewSelector";
import CurrentTemperature from "../../../components/currentTemperature/currentTemperature";
import FiveDayTemperature from "../../../components/fiveDayTemperature/fiveDayTemperature";
let wrapper, tabData;

beforeAll(() => {
  tabData = [
    {
      component: <CurrentTemperature />,
      label: "Current Temperature"
    },
    {
      component: <FiveDayTemperature />,
      label: "5 Day Forecast"
    }
  ];
  wrapper = shallow(<TemperatureViewSelector tabData={tabData} />);
});

describe("match snapshots ", () => {
  it("match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("test if the components are rendered ", () => {
  it("should render the TabSelector component", () => {
    expect(wrapper.find("TabSelector")).toBeTruthy();
  });
});
