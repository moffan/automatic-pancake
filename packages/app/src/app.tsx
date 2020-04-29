import React, { FunctionComponent } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import {
  AppContainer,
  Header,
  HeaderNav,
  HeaderNavItem,
  Main,
  Sidebar,
} from "@moffan/components";
import { Inventory } from "./inventory";

const Decks = () => <div>Decks</div>;

const Menu: FunctionComponent = () => {
  return (
    <HeaderNav>
      <HeaderNavItem to="/">Home</HeaderNavItem>
      <HeaderNavItem to="/inventory">Inventory</HeaderNavItem>
      <HeaderNavItem to="/decks">Decks</HeaderNavItem>
    </HeaderNav>
  );
};

const AppRouter: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/inventory">
        <Inventory />
      </Route>
      <Route path="/decks">
        <Decks />
      </Route>
      <Route path="/">
        <div>Home</div>
      </Route>
    </Switch>
  );
};

export const App: FunctionComponent = () => {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Menu />
        </Header>
        <Sidebar>Sidebar</Sidebar>
        <Main>
          <AppRouter />
        </Main>
      </AppContainer>
    </Router>
  );
};
