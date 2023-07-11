import React from "react";
import {create , act} from "react-test-renderer";
import App from "../App";

let tree;
describe("<App />", () => {
  it("renders correctly", () => {
    
      tree = create(<App />).toJSON();

    expect(tree).toMatchSnapshot();

  });
});
