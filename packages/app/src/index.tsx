import React from "react";
import { render } from "react-dom";

import { App } from "./app";

let appRoot = document.getElementById("app");
if (!appRoot) {
  console.debug("creating approot");

  appRoot = document.createElement("div");
  appRoot.setAttribute("id", "app");

  document.body.insertBefore(appRoot, document.body.firstChild);
}

render(<App />, appRoot);
