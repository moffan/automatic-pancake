export { default as Row } from "./row";

import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import React from "react";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
  background-color: lightgray;
  height: 100vh;
  overflow: auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 7fr 2fr;
  grid-template-rows: 1fr 23fr 1fr;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "sidebar footer footer";
`;

export const Sidebar = styled.div`
  background-color: pink;
  grid-area: sidebar;
  display: flex;
`;

export const Main = styled.div`
  overflow: auto;
  grid-area: main;
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: beige;
`;

export const HeaderNav = styled.nav`
  background-color: burlywood;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const HeaderNavItem: FunctionComponent<{
  to: string;
}> = ({ to, children }) => (
  <Link style={{ marginLeft: "5px" }} to={to}>
    {children}
  </Link>
);
