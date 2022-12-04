import { Scene } from 'phaser';

class FallingScene extends Scene {
  constructor() {
    super({ key: 'FallingScene' });
  }

  create() {
    // Creating Player (Lisa)
    this.player = new Lisa(this, 695, 0).setOrigin(0, 0);

    //Background - First Scene
    this.map = this.make.tilemap({ key: 'tilemap_FS' });
    this.waterAndRockTileset = this.map.addTilesetImage(
      'water_and_rock',
      'tiles'
    );
    this.textureOneTileSet = this.map.addTilesetImage(
      'textures_1',
      'texturesOne'
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
    this.texturesOneLayer = this.map.createLayer(
      'texture_1_layer',
      this.textureOneTileSet,
      0,
      0
    );
    this.texturesTwoLayer = this.map.createLayer(
      'texture_2_layer',
      this.textureTwoTileset,
      0,
      0
    );
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(95, 99);
    this.physics.add.collider(this.player, this.texturesTwoLayer);
    this.texturesTwoLayer.setCollisionBetween(1000, 1250);
  }
}

export default FallingScene;
