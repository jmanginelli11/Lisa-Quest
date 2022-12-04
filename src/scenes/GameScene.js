import { Scene, physics } from "phaser";
import { Lisa } from "./Lisa";
// import HealthBarSprite from './HealthBarSprite';

class GameScene extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;

  bar;

  map;
  groundLayer;
  surfaceTileset;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    // this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // this.scale.setUserScale(0.7, 0.7, 0, 0);
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // const { width, height } = this;
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(0, 0, "shiny_stars").setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

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

    // Creating Player (Lisa)
    this.player = new Lisa(this, 0, 0).setOrigin(0, 0);

    // Create player's healthBar
    let lisaHealth = this.makeBar(140, 100, 0x2e71cc);
    this.setValue(lisaHealth, 100);

    //Background - First Scene
    this.map = this.make.tilemap({ key: "tilemap" });
    this.surfaceTileset = this.map.addTilesetImage("surface", "tiles");
    this.vegetationOneTileset = this.map.addTilesetImage(
      "vegetation",
      "vegetation1"
    );

    this.vegetationTwoTileset = this.map.addTilesetImage(
      "vegetation_color",
      "vegetation2"
    );

    this.groundLayer = this.map.createLayer(
      "ground",
      this.surfaceTileset,
      0,
      0
    );
    this.vegetationLayerOne = this.map.createLayer(
      "vegetation",
      this.vegetationOneTileset,
      0,
      0
    );
    this.vegetationLayerTwo = this.map.createLayer(
      "vegetation_color",
      this.vegetationTwoTileset,
      0,
      0
    );

    //resizing to fit the playable game scene
    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.vegetationLayerOne.displayWidth = this.sys.canvas.width;
    this.vegetationLayerOne.displayHeight = this.sys.canvas.height;
    this.vegetationLayerTwo.displayWidth = this.sys.canvas.width;
    this.vegetationLayerTwo.displayHeight = this.sys.canvas.height;

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.surfaceTileset);
    this.groundLayer.setCollisionBetween(72, 99);

    console.log(this.physics.add);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 60, this.sys.canvas.height, "test")
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform);
    waterFallPlatform.setVisible(false);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, "bot").setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // this.bar = new HealthBarSprite(this, x, y);

    // Collider so enemy and player can interact
    this.physics.add.collider(this.player, this.enemy);
  }

  update(time) {
    // Update Player
    this.player.update();

    // Do enemy AI
    this.enemy.anims.play("enemy-idle");
    this.enemyFollows();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText("Time: " + Math.round(gameRunTime) + " seconds ");
  }

  // Following Enemy AI
  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }

  // healthBar Maker
  makeBar(x, y, color) {
    //blue = 0x2e71cc
    //red = 0xCC2E3A

    let bar = this.add.graphics();

    bar.fillStyle(color, 1);
    bar.fillRoundedRect(0, 0, 200, 35);

    bar.x = x;
    bar.y = y;
    return bar;
  }
  //increment and decrement health
  setValue(bar, percentage) {
    //scale the bar
    bar.scaleX = percentage / 100;
  }
}

export default GameScene;
