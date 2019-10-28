import React from "react";
import { shallow } from "enzyme";
import TableBody from "../../../../components/common/tableBody";

let mockData, wrapper;

beforeEach(() => {
  mockData = [{ pressure: 1017, humidity: 87, min_temp: 46, max_temp: 52 }];
  wrapper = shallow(<TableBody data={mockData} />);
});

describe("it renders component TableBody", () => {
  test("render the table data with the passed data props", () => {
    expect(wrapper).toMatchSnapshot();

    const tbody = wrapper.find("tbody");
    expect(tbody).toHaveLength(1);

    const rows = tbody.find("tr");
    expect(rows).toHaveLength(mockData.length);

    rows.forEach((tr, rowIndex) => {
      const cells = tr.find("td");
      expect(parseInt(cells.at(0).text())).toEqual(mockData[rowIndex].pressure);
      expect(parseInt(cells.at(1).text())).toEqual(mockData[rowIndex].humidity);
      expect(parseInt(cells.at(2).text())).toEqual(mockData[rowIndex].min_temp);
      expect(parseInt(cells.at(3).text())).toEqual(mockData[rowIndex].max_temp);
    });
  });
});
