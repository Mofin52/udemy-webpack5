import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import Heading from "./components/heading/heading.js";
import React from "react";
// import addImage from "./add-image.js";

const heading = new Heading();
const helloWorldButton = new HelloWorldButton();

heading.render("Hello world");
helloWorldButton.render();

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}

helloWorldButton.none();
// addImage();
