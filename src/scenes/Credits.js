import { Scene } from "phaser";
import { BigBoss } from "./BigBoss";
import { Lisa } from "./Lisa";

class Credits extends Scene {
  constructor() {
    super({ key: "Credits" });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.add.image(x, y, "stars");
    this.add.image(x, y, "creditsLOL");

    this.add.image(innerWidth * 0.75, innerHeight * 0.3, "naomi").setScale(7);
    this.add.image(innerWidth * 0.25, innerHeight * 0.3, "jags").setScale(7);
    this.add.image(innerWidth * 0.75, innerHeight * 0.6, "lauren").setScale(7);
    this.add.image(innerWidth * 0.25, innerHeight * 0.6, "sheyla").setScale(7);

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, "main-menu")
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on("pointerup", () => {
      this.scene.switch("MainMenu");
    });

    this.player = new Lisa(this, x, y);
    this.bigBoss = new BigBoss(this, x, y, this.player).setScale(4);

    // this.fire = this.physics.add.group();

    console.log("weapon?", this.add);
  }

  update() {
    this.player.update();
    this.bigBoss.update();

    // if(this.bigBoss.x - this.player.x <= 200)
  }
}

export default Credits;
