import store from '../store';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { persistAddedScores } from '../store/redux/scoresReducer';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class Last extends Scene {
  cameras;
  platforms;
  player;
  phone;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super('Last');
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.cameras.main.fadeIn(2000, 255, 255, 255);

    //Background
    this.stars = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

    //Tilemap
    this.map = this.make.tilemap({ key: 'tilemapPromisedLand' });

    //Tilesets
    this.groundAndWaterTileset = this.map.addTilesetImage(
      'ground_tileset',
      'tiles'
    );

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'rocks_and_plants_tileset',
      'vegetation1'
    );

    //Layers
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

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    // Adding player to be behind the plants
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      100,
      560
    );

    // Adding cellphone to scene
    this.phone = this.physics.add.sprite(x, y - 500, 'phone').setScale(2);
    this.phone.setGravityY(450);
    this.phone.setCollideWorldBounds(true);

    //Display adjustments
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

    // Colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.phone, this.groundLayer);
    this.groundLayer.setCollisionBetween(165, 171);

    //Form
    this.form = this.add
      .dom(x, y)
      .createFromCache('form')
      .setVisible(false)
      .setScale(x * 0.001);

    this.form.setPerspective(300);
    this.form.addListener('change');

    this.formCounter = 0;

    this.form.on('change', (evt) => {
      this.formCounter += 1;
      if (evt.target.name === 'username') {
        if (this.formCounter === 1) {
          let username = evt.target.value;
          store.dispatch(
            persistAddedScores({ name: username, score: data.score || 0 })
          );
        }
        this.scene.start('HighScores');
      }
    });

    //Winner text
    this.winnerText = this.add
      .text(
        x - x / 3,
        y - x / 2.5,
        'Congratulations! \nYou cleared the planet! \nThanks to you, \nLisa can now \ncommunicate with Earth \nand bring the rest of \nhumanity to safety. \n \nType up to four \n characters to save your score!',
        {
          fontSize: '30px',
          align: 'center',
        }
      )
      .setVisible(false)
      .setScale(x * 0.0012);

    if (this.player) {
      this.physics.add.overlap(this.player, this.phone, () => {
        this.phone.setVisible(false);
        this.form.setVisible(true);
        this.winnerText.setVisible(true);
      });

      let mainMenuButton = this.add
        .image(x / 5, y * 1.85, 'main-menu')
        .setScale(x * 0.0015)
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

export default Last;
