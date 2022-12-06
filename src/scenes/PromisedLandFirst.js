import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;

  constructor() {
    super({ key: 'PromisedLandFirst' });
  }

  create() {
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

    this.rocksAndPlantsLayer = this.map.createLayer(
      'rocks_and_plants_layer',
      this.rocksAndPlantsTileset,
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

    this.waterLayer = this.map.createLayer(
      'water_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.skyLayer = this.map.createLayer(
      'sky_layer',
      this.groundAndWaterTileset,
      0,
      0
    );

    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.mountainsLayer.displayWidth = this.sys.canvas.width;
    this.mountainsLayer.displayHeight = this.sys.canvas.height;

    // Creating Player (Lisa)
    this.player = new Lisa(this, 695, 0);

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(165, 170);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 120, this.sys.canvas.height, 'test')
      .refreshBody();
    this.physics.add.collider(this.player.waterFallPlatform, () => {
      this.scene.switch('secondFall');
    });
    waterFallPlatform.setVisible(false);
  }
  update() {
    this.player.update();
  }
}

export default PromisedLandFirst;
