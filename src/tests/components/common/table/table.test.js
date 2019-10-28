import React from "react";
import { shallow } from "enzyme";
import Table from "../../../../components/common/table";

let mockColumns, mockData, wrapper;

beforeEach(() => {
  mockColumns = ["Pressure", "Humidity", "Min °F", "Max °F"];
  mockData = [{ pressure: 1017, humidity: 87, min_temp: 46, max_temp: 52 }];
  wrapper = shallow(<Table columns={mockColumns} data={mockData} />);
});

describe("it renders component Table", () => {
  test("it should render the component correctly with the passed props", () => {
    expect(wrapper.find("TableHeader").prop("columns")).toEqual(mockColumns);
    expect(wrapper.find("TableBody").prop("data")).toBe(mockData);
    expect(wrapper).toMatchSnapshot();
  });
});
