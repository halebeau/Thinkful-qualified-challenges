import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("Test App", () => {
  let wrapper;
  const expectClose = (val1, val2, difference = 1000) =>
    expect(Math.abs(val1 - val2)).toBeLessThan(difference);
  const getTimestamps = () => {
    return wrapper.find("li").map((li) => new Date(li.text()).getTime());
  };
  beforeEach(() => {
    wrapper = mount(<App/>);
  });
  test("test has button", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });
  test("test zero clicks", () => {
    const timestamps = getTimestamps();
    expect(timestamps.length).toEqual(0);
  });
  test("test one click", () => {
    wrapper.find("button").simulate("click");
    const timestamp = Date.now();
    const timestamps = getTimestamps();
    expect(timestamps.length).toEqual(1);
    expectClose(timestamps[0], timestamp);
  });
  test("test two clicks", (done) => {
    wrapper.find("button").simulate("click");
    const timestamp1 = Date.now();
    setTimeout(() => {
      wrapper.find("button").simulate("click");
      const timestamp2 = Date.now();
      const timestamps = getTimestamps();
      expect(timestamps.length).toEqual(2);
      expectClose(timestamps[0], timestamp1);
      expectClose(timestamps[1], timestamp2);
      done();
    }, 100);
  });
});
