import Panda from "./panda.jpeg";
import "./panda-image.scss";

class PandaImage {
  render() {
    const img = document.createElement("img");
    img.src = Panda;
    img.alt = "Panda";
    img.classList.add("panda-image");
    const body = document.querySelector("body");
    body.appendChild(img);
  }
}

export default PandaImage;
