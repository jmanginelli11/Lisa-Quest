import axios from 'axios';
import store from '../store';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';

import { fetchScores } from '../store/redux/scoresReducer';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;
  phone;
  enemiesArray = [];
  // hasPhone = false;

  constructor(data) {
    super({ key: 'PromisedLand' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
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

    // Adding cellphone to scene
    this.phone = this.physics.add.sprite(x, y - 500, 'phone').setScale(2);
    this.phone.setGravityY(450);
    this.phone.setCollideWorldBounds(true);

    // Colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.phone, this.groundLayer);

    this.groundLayer.setCollisionBetween(165, 171);

    //Winner text
    this.winnerText = this.add
      .text(
        x,
        y,
        'Congratulations! \nYou cleared the planet! \nThanks to you, \nLisa can now \ncommunicate with Earth \nand bring the rest of \nhumanity to safety. \n Make sure to \ntype up to four \n characters to save your score!',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '30px',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setPosition(x - x / 2, y - y / 1.8)
      .setVisible(false)
      .setScale(x * 0.0012);

    //Form
    this.form = this.add
      .dom(x, y)
      .setOrigin(0, 0)
      .setPosition(x / 2 + x / 3, y + y / 9)
      .createFromCache('form')
      .setVisible(false);

    this.form.setPerspective(300);
    this.form.addListener('change');

    this.formCounter = 0;

    this.form.on('change', async (evt) => {
      this.formCounter += 1;
      if (evt.target.name === 'username') {
        if (this.formCounter === 1) {
          let username = evt.target.value;
          this.winnerText
            .setText(' Welcome ' + username)
            .setPosition(x - x / 3, y - y / 5)
            .setScale(x * 0.002);
          await axios.post('/api/scores', {
            name: username,
            score: data.score || 0,
          });
          store.dispatch(fetchScores());
        }
      }
    });

    if (this.player) {
      this.physics.add.overlap(this.player, this.phone, () => {
        this.phone.setVisible(false);
        this.form.setVisible(true);
        this.winnerText.setVisible(true);
      });
      // this.hasPhone = true;

      let mainMenuButton = this.add
        .image(x / 2, y * 1.8, 'main-menu')
        .setScale(1.5);
      mainMenuButton.setInteractive();
      mainMenuButton.on('pointerup', () => {
        this.scene.start('MainMenu');
      });
    }
  }

  update() {
    this.player.update();
    // Was trying to add some incentive for getting the phone in the end
    // if (this.hasPhone === true) {
    //   this.player.addScore(1000);
    // }
    // this.hasPhone = false;
    socket.emit('updatePlayers', { posy: this.player.y, posx: this.player.x });
    socket.on('updatePlayers', (data) => {
      console.log('called');
    });
  }
}

export default PromisedLandFirst;
