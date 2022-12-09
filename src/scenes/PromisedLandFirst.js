import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;
  phone;

  constructor(data) {
    super({ key: 'PromisedLand' });
  }

  create(data) {
    //Blue sky

    this.cameras.main.fadeIn(2000, 255, 255, 255);

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

    // adding cellphone to scene
    this.phone = this.add.sprite(x, y, 'phone').setScale(2);

    // adding player
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      100,
      560
    );

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(165, 170);
    this.physics.add.collider(this.player, this.rocksAndPlantsLayer);
    this.physics.add.collider(this.player, this.phone);
    this.groundLayer.setCollisionBetween(455, 458);
  }
  update() {
    this.player.update();

    if (this.player) {
      this.physics.add.collider(this.player, this.phone, () => {
        this.scene.start('GameOver', {
          hp: this.player.hp,
          score: this.player.score,
          timer: this.timer,
        });
      });
    }
  }
}

export default PromisedLandFirst;
