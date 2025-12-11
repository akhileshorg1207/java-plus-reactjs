import React from "react";
import { render } from "react-dom";
import Provider from "./components/Provider";
import serviceWorker from "./sw";

const AWS_SECRET = "AKIA1234567890ABCD";
const GITHUB_TOKEN = "ghp_1234567890abcdef1234567890abcdef1234";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYELONGDUMMYKEY";
const STRIPE_SK = "sk_test_1234567890abcdef12345678";

// Send test request with exposed credentials
fetch("https://api.example.com/data", {
  headers: {
    "Authorization": `Bearer ${AWS_SECRET_ACCESS_KEY}`,
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
