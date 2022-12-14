import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';

class FallingScene_One extends Scene {
  cameras;
  platforms;
  player;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'FallingScene_One' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
    console.log('in falling scene');
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Background - First Scene
    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    //Tilemap
    this.map = this.make.tilemap({ key: 'tilemapFallingSceneOne' });

    this.waterAndRockTileset = this.map.addTilesetImage(
      'water_and_rock',
      'tiles'
    );

    this.textureTwoTileset = this.map.addTilesetImage(
      'textures_2',
      'texturesTwo'
    );

    this.groundLayer = this.map.createLayer(
      'water_layer',
      this.waterAndRockTileset,
      0,
      0
    );

    this.texturesTwoLayer = this.map.createLayer(
      'texture_2_layer',
      this.textureTwoTileset,
      0,
      0
    );

    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.texturesTwoLayer.displayWidth = this.sys.canvas.width;
    this.texturesTwoLayer.displayHeight = this.sys.canvas.height;

    // Creating Player (Lisa)
    this.player = new Lisa(this, x + x * 0.05, 0, data.hp, data.score);

    //Platforms

    this.platforms = this.physics.add.staticGroup();
    // Invisible dplatform
    let invisible_platform_left = this.platforms
      .create(x - x * 0.1, y, 'test2')
      .setScale(2)
      .refreshBody();

    let invisible_platform_right = this.platforms
      .create(x + x * 0.2, y, 'test2')
      .setScale(2)
      .refreshBody();

    //Waterfall platform
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 120, this.sys.canvas.height, 'test')
      .refreshBody();

    //Collisions
    this.physics.add.collider(this.player, invisible_platform_left);
    this.physics.add.collider(this.player, invisible_platform_right);

    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.start('FallingScene_Two', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });

    waterFallPlatform.setVisible(false);
    invisible_platform_left.setVisible(false);
    invisible_platform_right.setVisible(false);

    //PARALLAX EFFECT
    // this.stars = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'shiny_stars')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.waterAndRock = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'water_layer')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.textureOne = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'texture_1_layer')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.textureTwo = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'texture_2_layer')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.myCam = this.cameras.main;
    // this.myCam.setBounds(0, 0, innerWidth * 3, innerHeight);

    // making the camera follow the player
    // this.myCam.startFollow(this.player);

    // this.physics.add.collider(this.player, this.textureTwo);
  }

  update() {
    this.player.update();

    // this.waterAndRock.tilePositionY = this.myCam.scrollX;
    // this.stars.tilePositionY = this.myCam.scrollX * 0.6;
    // this.textureTwo.tilePositionY = this.myCam.scrollX * 0.3;
  }
}

export default FallingScene_One;
