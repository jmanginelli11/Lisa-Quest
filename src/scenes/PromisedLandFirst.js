import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;
  phone;

  constructor(data) {
    super({ key: 'PromisedLand' });
  }

  create(data) {
    this.cameras.main.fadeIn(2000, 255, 255, 255);

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Background
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

    this.phoneTile = this.map.addTilesetImage('phone_tile', 'boss_tileset2');

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

    this.phoneLayer = this.map.createLayer('phone_layer', this.phoneTile, 0, 0);
    // .setScale(2);

    this.rocksAndPlantsLayer = this.map.createLayer(
      'rocks_and_plants_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.invisibleLayer = this.map.createLayer(
      'invisible_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    // adding player to be behind the plants
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      100,
      560
    );

    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.mountainsLayer.displayWidth = this.sys.canvas.width;
    this.mountainsLayer.displayHeight = this.sys.canvas.height;
    this.waterLayer.displayWidth = this.sys.canvas.width;
    this.waterLayer.displayHeight = this.sys.canvas.height;
    this.rocksAndPlantsLayer.displayWidth = this.sys.canvas.width;
    this.rocksAndPlantsLayer.displayHeight = this.sys.canvas.height;
    this.phoneLayer.displayWidth = this.sys.canvas.width;
    this.phoneLayer.displayHeight = this.sys.canvas.height;
    this.invisibleLayer.displayWidth = this.sys.canvas.width;
    this.invisibleLayer.displayHeight = this.sys.canvas.height;
    this.physics.add.collider(
      this.player,
      this.invisibleLayer,
      this.player.hitSpikyPlant
    );
    // adding cellphone to scene
    // this.phone = this.add.image(x + x / 3, y, 'phone').setScale(2);

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    // this.physics.add.collider(this.player, this.rocksAndPlantsLayer);
    // this.physics.add.collider(this.player, this.invisibleLayer);
    this.groundLayer.setCollisionBetween(165, 171);
    // this.groundLayer.setCollisionBetween(455, 458);
    this.invisibleLayer.setCollisionBetween(190, 196);
  }
  update() {
    this.player.update();

    // if (this.player) {
    //   this.physics.add.collider(this.player, this.phone, () => {
    //     // this.scene.start('GameOver', {
    //     //   hp: this.player.hp,
    //     //   score: this.player.score,
    //     //   timer: this.timer,
    //     // });
    //     this.addScore = this.add
    //       .text(x - 230, y + 95, 'Congratulations! \nYou are a winner', {
    //         fontFamily: '"Press Start 2P"',
    //         fontSize: '20px',
    //       })
    //       .setOrigin(0, 0);
    //   });
    // }
  }
}

export default PromisedLandFirst;
