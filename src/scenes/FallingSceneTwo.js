import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FallingSceneTwo extends Scene {
  cameras;
  constructor() {
    super({ key: 'FallingSceneTwo' });
  }

  create() {
    // Creating Player (Lisa)

    //Background - First Scene

    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

    this.map = this.make.tilemap({ key: 'tilemapFallingSceneTwo' });
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

    //player
    this.player = new Lisa(this, 695, 0).setOrigin(0, 0);

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(95, 99);
    this.physics.add.collider(this.player, this.texturesTwoLayer);
    this.texturesTwoLayer.setCollisionBetween(1000, 1250);
  }

  update() {
    this.player.update();
  }
}

export default FallingSceneTwo;
