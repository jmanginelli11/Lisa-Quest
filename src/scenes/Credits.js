import { Scene } from "phaser";

class Credits extends Scene {
  constructor() {
    super({ key: "Credits" });
  }

  preload() {
    this.load.image("creditsLOL", "/assets/menu/creditsLOL.png");
    this.load.image("main-menu", "/assets/menu/mainMenu_white.png");
  }

  create() {
    this.add.image(400, 300, "creditsLOL");

    let mainMenuButton = this.add.image(125, 575, "main-menu").setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on("pointerup", () => {
      this.scene.switch("MainMenu");
    });
  }
}

export default Credits;
