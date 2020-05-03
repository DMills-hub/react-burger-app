import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({
  adapter: new Adapter(),
});

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("Should render two Nav Items if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("Should render three Nav Items if authenticated", () => {
    wrapper.setProps({ authenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("Should render three Nav Items if authenticated", () => {
    wrapper.setProps({ authenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
