import { Scene, physics } from "phaser";
// import { loadAnims, lisaSprite, loadSpritesheets } from './Lisa';

class Jackie extends Scene {
  constructor() {
    super({ key: "Jackie" });
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

    let timeTextStyle = {
      font: "24px Roboto",
      fill: "#E43AA4",
      stroke: "#000",
      strokeThickness: 4,
    };
    this.timer = this.add.text(16, 16, "Time: ", timeTextStyle);

    // Test platform (needed for char testing)
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(x, innerHeight - 400, "ground")
      .setScale(4)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, "bot").setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, "bot").setScale(2);
    this.enemy.setCollideWorldBounds(true);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    // Idling and basic movement

    let gameRunTime = time * 0.001;
    this.timer.setText("Time: " + Math.round(gameRunTime) + " seconds ");
  }
}

export default Jackie;
