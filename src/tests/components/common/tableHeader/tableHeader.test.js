import React from "react";
import { shallow } from "enzyme";
import TableHeader from "../../../../components/common/tableHeader";

let mockColumns, wrapper;

beforeEach(() => {
  mockColumns = ["Pressure", "Humidity", "Min °F", "Max °F"];
  wrapper = shallow(<TableHeader columns={mockColumns} />);
});

describe("it renders component TableHeader", () => {
  test("render the table data with the passed data props", () => {
    expect(wrapper).toMatchSnapshot();

    const thead = wrapper.find("thead");
    expect(thead).toHaveLength(1);

    const headers = thead.find("th");
    expect(headers).toHaveLength(mockColumns.length);

    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(mockColumns[idx]);
    });
  });
});
