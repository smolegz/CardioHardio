import React from "react";
import {create, act} from 'react-test-renderer';
import Slider from "../components/Slider";

let root;

describe("Slider", () => {
  it("renders correctly", () => {
    const tree = create(<Slider />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})


