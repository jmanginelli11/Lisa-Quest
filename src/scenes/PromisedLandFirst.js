import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';
import axios from 'axios';
import store from '../store';
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

    if (this.player) {
      this.physics.add.overlap(this.player, this.phone, () => {
        this.phone.setVisible(false);
        // this.hasPhone = true;
        this.add
          .text(
            x - x * 0.7,
            y - y * 0.6,
            'Congratulations! \nYou cleared the planet! \nThanks to you, \nLisa can now \ncommunicate with Earth \nand bring the rest of \nhumanity to safety.',
            {
              fontFamily: '"Press Start 2P"',
              fontSize: '30px',
              // align: 'center',
            }
          )
          .setOrigin(0, 0);
        this.addScore = this.add
          .text(
            x - 230,
            y + 95,
            'Type up to four letters\n to save your score!',
            {
              fontFamily: '"Press Start 2P"',
              fontSize: '20px',
            }
          )
          .setOrigin(0, 0);

        const element = this.add.dom(x, y + 170).createFromCache('form');

        element.setPerspective(300);
        element.addListener('change');

        element.on('change', async (evt) => {
          if (evt.target.name === 'username') {
            let username = evt.target.value;
            await axios.post('/api/scores', {
              name: username,
              score: data.score || 0,
            });
            store.dispatch(fetchScores());
          }
        });

        let mainMenuButton = this.add
          .image(x / 2, y * 1.8, 'main-menu')
          .setScale(1.5);
        mainMenuButton.setInteractive();
        mainMenuButton.on('pointerup', () => {
          this.scene.start('MainMenu');
        });
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
  }
}

export default PromisedLandFirst;
