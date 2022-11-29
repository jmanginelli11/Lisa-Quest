import { Scene } from "phaser";

class HighScores extends Scene {
  constructor() {
    super({ key: "HighScores" });
  }

  preload() {
    this.load.image("sky", "/assets/menu/sky.png");
  }

  create() {
    this.add.image(400, 300, "sky");
  }
}

export default HighScores;
