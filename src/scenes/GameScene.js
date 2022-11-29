import { Scene } from "phaser";

class GameScene extends Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("sky", "/assets/menu/sky.png");
    this.load.image("main-menu", "/assets/menu/mainMenu_white.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    let mainMenuButton = this.add.image(125, 575, "main-menu").setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on("pointerup", () => {
      this.scene.switch("MainMenu");
    });
  }
}

export default GameScene;
