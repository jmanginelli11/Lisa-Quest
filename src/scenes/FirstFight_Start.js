import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FirstFight_Start extends Scene {
  cameras;
  player;

  constructor() {
    super({ key: 'FirstFight_Start' });
  }

  create() {
    // Background - First Scene

    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.map = this.make.tilemap({ key: 'tilemap_FF' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'rock_and_pants_tileset',
      'vegetation2'
    );

    this.groundAndPlatforms = this.map.createLayer(
      'ground_and_platforms',
      this.groundTileset,
      0,
      0
    );

    this.rocksAndPlants = this.map.createLayer(
      'rocks_and_plants',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.player = new Lisa(this, 0, 0).setOrigin(0, 0);
    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
  }

  update() {
    this.player.update();
  }
}

export default FirstFight_Start;
