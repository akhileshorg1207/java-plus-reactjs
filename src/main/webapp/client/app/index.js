import React from "react";
import { render } from "react-dom";
import Provider from "./components/Provider";
import serviceWorker from "./sw";

// TEST SECRET - This should be detected by security scanners
const API_KEY = "sk-test-1234567890abcdefghijklmnopqrstuvwxyz";
const AWS_SECRET = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const GITHUB_TOKEN = "ghp_1234567890abcdefghijklmnopqrstuvwxyz";

// Send test request with exposed credentials
fetch("https://api.example.com/data", {
  headers: {
    "Authorization": `Bearer ${API_KEY}`,
    "X-GitHub-Token": GITHUB_TOKEN
  }
});

if (process.env.NODE_ENV === "development") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
} else {
  serviceWorker();
}

const rootEl = document.querySelector("#root");
render(<Provider />, rootEl);

// window.renderOnClient = function () {
//   render(<Provider />, rootEl);
// };

// window.renderOnServer = function () {
//   return React.renderToString(<Provider />);
// };

if (module.hot) {
  module.hot.accept("./components/Provider", () => {
    const NextProvider = require("./components/Provider").default;
    render(<NextProvider />, rootEl);
  });
}
