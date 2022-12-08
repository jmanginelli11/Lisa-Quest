import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;

  constructor(data) {
    super({ key: 'PromisedLandFirst' });
  }

  create(data) {
    //Blue sky

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.stars = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    //Tilemap
    this.map = this.make.tilemap({ key: 'tilemapPromisedLand' });
    this.groundAndWaterTileset = this.map.addTilesetImage(
      'ground_tileset',
      'tiles'
    );

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'rocks_and_plants_tileset',
      'vegetation1'
    );

    this.skyLayer = this.map.createLayer(
      'sky_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.waterLayer = this.map.createLayer(
      'water_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.mountainsLayer = this.map.createLayer(
      'mountains_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.groundLayer = this.map.createLayer(
      'ground_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.rocksAndPlantsLayer = this.map.createLayer(
      'rocks_and_plants_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    // this.mountainsLayer.displayWidth = this.sys.canvas.width;
    // this.mountainsLayer.displayHeight = this.sys.canvas.height;

    // adding player
    this.player = new Lisa(this, x, y, data.hp, data.score);

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(165, 170);
    this.physics.add.collider(this.player, this.rocksAndPlantsLayer);
    this.groundLayer.setCollisionBetween(455, 458);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width, this.sys.canvas.height - 300, 'test2')
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.start('Form', {
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    waterFallPlatform.setVisible(false);
  }
  update() {
    this.player.update();
  }
}

export default PromisedLandFirst;
