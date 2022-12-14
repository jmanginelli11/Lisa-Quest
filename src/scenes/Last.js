import store from '../store';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';
import { persistAddedScores } from '../store/redux/scoresReducer';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;
  phone;
  enemiesArray = [];
  laserGroup;
  x = innerWidth / 2;
  y = innerHeight / 2;

  constructor(data) {
    super('PromisedLand');
  }

  preload() {
    // this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    this.cameras.main.fadeIn(2000, 255, 255, 255);

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

    // Adding player to be behind the plants
    this.player = new Lisa(
      this,
      this.x,
      this.y,
      data.hp,
      data.score
    ).setPosition(100, 560);

    this.stars.displayWidth = this.sys.canvas.width;
    this.stars.displayHeight = this.sys.canvas.height;
    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.mountainsLayer.displayWidth = this.sys.canvas.width;
    this.mountainsLayer.displayHeight = this.sys.canvas.height;
    this.waterLayer.displayWidth = this.sys.canvas.width;
    this.waterLayer.displayHeight = this.sys.canvas.height;
    this.rocksAndPlantsLayer.displayWidth = this.sys.canvas.width;
    this.rocksAndPlantsLayer.displayHeight = this.sys.canvas.height;

    // Adding cellphone to scene
    this.phone = this.physics.add
      .sprite(this.x, this.y - 500, 'phone')
      .setScale(2);
    this.phone.setGravityY(450);
    this.phone.setCollideWorldBounds(true);

    // Colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.phone, this.groundLayer);

    this.groundLayer.setCollisionBetween(165, 171);

    //Winner text
    this.winnerText = this.add
      .text(
        this.x,
        this.y,
        'Congratulations! \nYou cleared the planet! \nThanks to you, \nLisa can now \ncommunicate with Earth \nand bring the rest of \nhumanity to safety. \n \nType up to four \n characters to save your score!',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '30px',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setPosition(this.x - this.x / 2, this.y - this.y / 1.8)
      .setVisible(false)
      .setScale(this.x * 0.0012);

    //Form
    this.form = this.add
      .dom(this.x, this.y)
      .setOrigin(0, 0)
      .setPosition(this.x / 2 + this.x / 3, this.y + this.y / 5)
      .createFromCache('form')
      .setVisible(false);

    this.form.setPerspective(300);
    this.form.addListener('change');

    this.formCounter = 0;

    this.form.on('change', (evt) => {
      this.formCounter += 1;
      if (evt.target.name === 'username') {
        if (this.formCounter === 1) {
          let username = evt.target.value;
          this.winnerText
            .setText(' Welcome ' + username)
            .setPosition(this.x - this.x / 3, this.y - this.y / 5)
            .setScale(this.x * 0.002);
          store.dispatch(
            persistAddedScores({ name: username, score: data.score || 0 })
          );
        }
        console.log('about to start HighScores scene');
        this.scene.start('HighScores');
      }
    });

    if (this.player) {
      this.physics.add.overlap(this.player, this.phone, () => {
        this.phone.setVisible(false);
        this.form.setVisible(true);
        this.winnerText.setVisible(true);
      });

      let mainMenuButton = this.add
        .image(this.x / 5, this.y * 1.85, 'main-menu')
        .setScale(this.x * 0.0015)
        .setInteractive();
      mainMenuButton.on('pointerup', () => {
        this.scene.start('MainMenu');
      });
    }
  }

  update(data) {
    this.player.update();
  }
}

export default PromisedLandFirst;
