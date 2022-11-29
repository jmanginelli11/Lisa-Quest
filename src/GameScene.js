import { Scene } from "phaser";

class GameScene extends Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("sky", "/assets/menu/sky.png");
  }

  create() {
    this.add.image(400, 300, "sky");
  }
}

export default GameScene;
