import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FirstFight extends Scene {
  cameras;
  player;

  constructor() {
    super({ key: 'FirstFight' });
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

    this.groundAndPlatforms = this.map
      .createLayer('ground_and_platforms', this.groundTileset, 0, 0)
      .setScrollFactor(0);

    this.rocksAndPlants = this.map
      .createLayer('rocks_and_plants', this.rocksAndPlantsTileset, 0, 0)
      .setScrollFactor(0);

    this.player = new Lisa(this, 0, 0).setOrigin(0, 0);
    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.setCollisionBetween(720, 746);

    //PARALLAX EFFECT
    // this.sun = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'sun')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.groundAndPlatforms = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'ground_and_platforms')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.rocksAndPlants = this.add
    //   .tileSprite(0, 0, innerWidth, innerHeight, 'rocks_and_plants')
    //   .setOrigin(0, 0)
    //   .setScrollFactor(0);

    // this.player = new Lisa(this, 0, 0).setOrigin(0, 0);

    // this.myCam = this.cameras.main;
    // this.myCam.setBounds(0, 0, innerWidth * 3, innerHeight);

    // making the camera follow the player
    // this.myCam.startFollow(this.player);

    // this.physics.add.collider(this.player, this.textureTwo);
  }

  update() {
    this.player.update();

    // this.groundAndPlatforms.tilePositionX = this.myCam.scrollX;
    // this.sun.tilePositionX = this.myCam.scrollX * 0.3;
    // this.rocksAndPlants.tilePositionX = this.myCam.scrollX * 0.3;
  }
}

export default FirstFight;
