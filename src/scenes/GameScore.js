import { Scene } from "phaser";

class GameScore extends Scene {
  constructor() {
    super({ key: "GameScore" });
  }

  preload() {
    this.load.image("sky", "/assets/menu/sky.png");
  }

  create() {
    this.add.image(400, 300, "sky");
  }
}

export default GameScore;
