import * as React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useState } from "react";
import { pointColor, ScreenSmall } from "./Common";

const Nav = () => {
  const [type, setType] = useState("works");

  const onClickType = (value) => {
    setType(value);
  };

  return (
    <Header>
      <NavWrap>
        <div className="brand">
          <Link
            to="/"
            style={{ display: "flex", gap: 20 }}
            onClick={() => onClickType("works")}
          >
            <img
              src="logo.png"
              width={200}
              alt="logo"
            />
          </Link>
        </div>
        <UL>
          <li key={"works"}>
            <Link to="/">
              <Text
                primary={type === "works" && "primary"}
                onClick={() => onClickType("works")}
              >
                Works
              </Text>
            </Link>
          </li>
          <li key={"about"}>
            <Link to="/about">
              <Text
                primary={type === "about" && "primary"}
                onClick={() => onClickType("about")}
              >
                About
              </Text>
            </Link>
          </li>
        </UL>
      </NavWrap>
    </Header>
  );
};

export default Nav;

const Header = styled.header`
  width: 100%;
  border-bottom: 1px solid #222;
`;

const NavWrap = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  @media screen and (max-width: ${ScreenSmall}) {
    flex-direction: column;
    gap: 20px;
  }
`;

const UL = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 32px;
`;

const Text = styled.span`
  color: ${(props) => (props.primary ? pointColor : "white")};
  font-size: 16px;
  text-align: left;
  &:hover {
    color: ${pointColor};
  }
  &.active {
    color: ${pointColor};
  }
  &.logout {
    margin-left: 30px;
    font-size: 13px;
    padding: 3px 8px;
    border: 1px solid #666;
    border-radius: 5px;
  }
`;
