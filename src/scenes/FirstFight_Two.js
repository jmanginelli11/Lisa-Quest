import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FirstFight_Two extends Scene {
  cameras;
  player;

  constructor() {
    super({ key: 'FirstFight_Two' });
  }

  create() {
    // Background - First Scene

    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.sun.displayWidth = this.sys.canvas.width;
    this.sun.displayHeight = this.sys.canvas.height;
    this.map = this.make.tilemap({ key: 'tilemap_FF2' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'plants_rocks_tileset',
      'vegetation2'
    );

    this.rocksAndPlantsTilesetTwo = this.map.addTilesetImage(
      'plants_rocks_tileset_2',
      'vegetation1'
    );

    this.mechanicalTileset = this.map.addTilesetImage(
      'mechanical_tileset',
      'mechanical'
    );

    this.groundAndPlatforms = this.map.createLayer(
      'ground_layer',
      this.groundTileset,
      0,
      0
    );

    this.rocksAndPlants = this.map.createLayer(
      'rocks_and_plants_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.rocksAndPlantsTwo = this.map.createLayer(
      'rocks_and_plants_layer_2',
      this.rocksAndPlantsTilesetTwo,
      0,
      0
    );

    this.mechanicalLayer = this.map.createLayer(
      'mechanical_layer',
      this.mechanicalTileset,
      0,
      0
    );

    this.player = new Lisa(this, 100, 100).setScale(3);
    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.displayWidth = this.sys.canvas.width;
    this.groundAndPlatforms.displayHeight = this.sys.canvas.height;
    // this.groundAndPlatforms.setCollisionBetween(720, 746);
  }

  update() {
    this.player.update();
  }
}

export default FirstFight_Two;
