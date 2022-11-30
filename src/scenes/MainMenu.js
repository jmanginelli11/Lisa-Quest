import { Scene } from "phaser";

class MainMenu extends Scene {
  constructor() {
    super({ key: "MainMenu" });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, "stars");

    let playButton = this.add.image(x, y, "play-white").setScale(5);
    let creditsButton = this.add.image(x, y + 100, "credits-white").setScale(3);
    let formButton = this.add.image(x, y + 200, "credits-white").setScale(4);

    playButton.setInteractive();
    creditsButton.setInteractive();
    formButton.setInteractive();

    let hoverSprite1 = this.add.sprite(100, 100, "lisa").setScale(3.5);
    hoverSprite1.setVisible(false);
    let hoverSprite2 = this.add.sprite(100, 100, "lisa-alt").setScale(3.5);
    hoverSprite2.setVisible(false);
    hoverSprite2.flipX = true;

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("lisa", { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "alt-run",
      frames: this.anims.generateFrameNumbers("lisa-alt", {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });

    playButton.on("pointerover", () => {
      playButton = this.add.image(x, y, "play-red").setScale(5);

      hoverSprite1.setVisible(true);
      hoverSprite1.play("run");
      hoverSprite1.x = playButton.x - 150;
      hoverSprite1.y = playButton.y - 75;

      hoverSprite2.setVisible(true);
      hoverSprite2.play("alt-run");
      hoverSprite2.x = playButton.x + 150;
      hoverSprite2.y = playButton.y - 75;
    });

    playButton.on("pointerout", () => {
      playButton = this.add.image(x, y, "play-white").setScale(5);
      hoverSprite1.setVisible(false);
      hoverSprite2.setVisible(false);
    });

    playButton.on("pointerup", () => {
      console.log("lesssss gooooooooooo");
      this.scene.switch("GameScene");
    });

    creditsButton.on("pointerover", () => {
      creditsButton = this.add.image(x, y + 100, "credits-red").setScale(3);
    });

    creditsButton.on("pointerout", () => {
      creditsButton = this.add.image(x, y + 100, "credits-white").setScale(3);
    });
    creditsButton.on("pointerup", () => {
      this.scene.switch("Credits");
    });

    formButton.on("pointerover", () => {
      formButton = this.add.image(x, y + 200, "credits-red").setScale(4);
    });

    formButton.on("pointerout", () => {
      formButton = this.add.image(x, y + 200, "credits-white").setScale(4);
    });
    formButton.on("pointerup", () => {
      this.scene.switch("Form");
    });
  }
}

export default MainMenu;
