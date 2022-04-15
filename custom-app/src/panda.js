import Heading from "./components/heading/heading.js";
import PandaImage from "./components/panda-image/panda-image";
import React from "react";

const heading = new Heading();
const pandaImage = new PandaImage();

heading.render("Panda");
pandaImage.render();
