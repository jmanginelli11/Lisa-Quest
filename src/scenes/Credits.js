import { Scene } from "phaser";

class Credits extends Scene {
  constructor() {
    super({ key: "Credits" });
  }

  preload() {
    this.load.image("stars", "/assets/menu/stars_background.png");
    this.load.image("creditsLOL", "/assets/menu/creditsLOL.png");
  }

  create() {
    this.add.image(400, 300, "stars");
    this.add.image(400, 300, "creditsLOL");
  }
}

export default Credits;
