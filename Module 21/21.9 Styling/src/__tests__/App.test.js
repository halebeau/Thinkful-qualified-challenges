const fs = require("fs");
const path = require("path");
import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";

Enzyme.configure({ adapter: new Adapter() });

describe("Test App.js", () => {
  let wrapper;
  let divWrapper;
  let h1Wrapper;
  let h4Wrapper;
  let h5Wrapper;

  beforeEach(() => {
    wrapper = shallow(<App/>);
    divWrapper = wrapper.find("div");
    h1Wrapper = wrapper.find("h1");
    h4Wrapper = wrapper.find("h4");
    h5Wrapper = wrapper.find("h5");
  });
  test("text is unchanged", () => {
    const wrapper = shallow(<App/>);
    expect(divWrapper.length).toEqual(1);
    expect(h1Wrapper.length).toEqual(1);
    expect(h1Wrapper.text()).toEqual("Hello!");
    expect(h4Wrapper.length).toEqual(1);
    expect(h4Wrapper.text()).toEqual("How are you?");
    expect(h5Wrapper.length).toEqual(1);
    expect(h5Wrapper.text()).toEqual("Today is a nice day!");
    expect(wrapper.text()).toEqual("Hello!How are you?Today is a nice day!");
    expect(divWrapper.text()).toEqual("Hello!How are you?Today is a nice day!");
  });
  test("test centering", () => {
    try {
      expect(divWrapper.prop("style")).toHaveProperty("textAlign", "center");
    } catch {
      expect(h1Wrapper.prop("style")).toHaveProperty("textAlign", "center");
      expect(h4Wrapper.prop("style")).toHaveProperty("textAlign", "center");
    }
  });
  test("test h1 cursive", () => {
    expect(h1Wrapper.prop("style")).toHaveProperty("fontFamily", "cursive");
  });
  test("test h4 monospace", () => {
    expect(h4Wrapper.prop("style")).toHaveProperty("fontFamily", "monospace");
  });

  test("test h5 external stylesheet", () => {
    const filePath = path.join(__dirname, "..", "App.js");
    const contents = fs.readFileSync(filePath, "utf-8");
    expect(contents).toContain('import "./App.css"');

    expect(h5Wrapper.props().className).toEqual("App-weather-message");
  });
});
