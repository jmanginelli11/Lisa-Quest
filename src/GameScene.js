import { Scene } from "phaser";

class GameScene extends Scene {
  preload() {
    this.load.image("logo", "src/assets/logo.png");
    this.load.image("sky", "src/assets/sky.png");
    this.load.image("play-red", "src/assets/play_red.png");
    this.load.image("play-white", "src/assets/play_white.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    let playButton = this.add.image(400, 300, "play-white").setScale(5);

    playButton.setInteractive();

    playButton.on("pointerover", () => {
      playButton = this.add.image(400, 300, "play-red").setScale(5);
    });

    playButton.on("pointerout", () => {
      playButton = this.add.image(400, 300, "play-white").setScale(5);
    });

    playButton.on("pointerup", () => {
      console.log("lesssss gooooooooooo");
    });
  }
}

export default GameScene;
