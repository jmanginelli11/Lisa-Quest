import { Scene } from "phaser";

class GameScene extends Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.image("stars", "/assets/menu/stars_background.png");
    this.load.image("main-menu", "/assets/menu/mainMenu_white.png");
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, "stars");

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, "main-menu")
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on("pointerup", () => {
      this.scene.switch("MainMenu");
    });
  }
}

export default GameScene;
