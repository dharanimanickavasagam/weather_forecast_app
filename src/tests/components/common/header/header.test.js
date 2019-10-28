import React from "react";
import { shallow } from "enzyme";
import Header from "../../../../components/common/header";

let wrapper, mockName, mockVariant;

beforeEach(() => {
  mockName = "mockerName";
  mockVariant = "h6";
  wrapper = shallow(<Header name={mockName} variant={mockVariant} />);
});

describe("it renders component Header", () => {
  test("it should render the component with the passed props", () => {
    expect(
      wrapper.find("WithStyles(ForwardRef(Typography))").prop("variant")
    ).toEqual(mockVariant);

    expect(wrapper.find("WithStyles(ForwardRef(Typography))").text()).toBe(
      mockName
    );
    expect(wrapper).toMatchSnapshot();
  });
});
