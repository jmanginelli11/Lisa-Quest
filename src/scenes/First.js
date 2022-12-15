import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class First extends Scene {
  cameras;
  platforms;
  player;
  enemiesArray = [];

  constructor(data) {
    super('First');
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Backgrounds
    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    //Tilemap
    this.map = this.make.tilemap({ key: 'tilemapFallingSceneOne' });

    //Tilesets
    this.waterAndRockTileset = this.map.addTilesetImage(
      'water_and_rock',
      'tiles'
    );

    this.textureTwoTileset = this.map.addTilesetImage(
      'textures_2',
      'texturesTwo'
    );

    //Layers
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

    //Display adjustment
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
      this.scene.start('Second', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });

    waterFallPlatform.setVisible(false);
    invisible_platform_left.setVisible(false);
    invisible_platform_right.setVisible(false);
  }

  update() {
    this.player.update();
  }
}

export default First;
