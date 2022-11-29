import { Scene } from "phaser";

class MainMenu extends Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  preload() {
    this.load.image("logo", "/assets/menu/logo.png");
    this.load.image("sky", "/assets/menu/sky.png");
    this.load.image("play-red", "/assets/menu/play_red.png");
    this.load.image("play-white", "/assets/menu/play_white.png");
    this.load.image("credits-white", "/assets/menu/credits_white.png");
    this.load.image("credits-red", "/assets/menu/credits_red.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    let playButton = this.add.image(400, 300, "play-white").setScale(5);
    let creditsButton = this.add.image(400, 375, "credits-white").setScale(3);

    playButton.setInteractive();
    creditsButton.setInteractive();

    playButton.on("pointerover", () => {
      playButton = this.add.image(400, 300, "play-red").setScale(5);
    });

    playButton.on("pointerout", () => {
      playButton = this.add.image(400, 300, "play-white").setScale(5);
    });

    playButton.on("pointerup", () => {
      console.log("lesssss gooooooooooo");
      this.scene.switch("GameScene");
    });

    creditsButton.on("pointerover", () => {
      creditsButton = this.add.image(400, 375, "credits-red").setScale(3);
    });

    creditsButton.on("pointerout", () => {
      creditsButton = this.add.image(400, 375, "credits-white").setScale(3);
    });

    creditsButton.on("pointerup", () => {
      this.scene.switch("Credits");
    });
  }
}

export default MainMenu;
