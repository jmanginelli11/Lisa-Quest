import store from '../store';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';
import { persistAddedScores } from '../store/redux/scoresReducer';
import { isAllOf } from '@reduxjs/toolkit';

class PromisedLandFirst extends Scene {
  cameras;
  platforms;
  player;
  otherPlayer;
  // otherPlayers;
  phone;
  enemiesArray = [];
  x = innerWidth / 2;
  y = innerHeight / 2;
  // hasPhone = false;

  constructor(data) {
    super({ key: 'PromisedLand' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    this.socket = io();
    this.otherPlayers = this.physics.add.group();

    this.cameras.main.fadeIn(2000, 255, 255, 255);

    // const x = innerWidth / 2;
    // const y = innerHeight / 2;

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
    // this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
    //   100,
    //   560
    // );

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

    // Creating player and watching for new players to join screen
    this.createPlayer();

    this.socket.on('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === this.socket.id) {
          this.createPlayer(players[id]);
        } else {
          this.addOtherPlayers(players[id]);
        }
      });
    });

    this.socket.on('newPlayer', (playerInfo) => {
      this.addOtherPlayers(playerInfo);
    });

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
      .setPosition(this.x / 2 + this.x / 3, this.y + this.y / 9)
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
            .setPosition(x - x / 3, y - y / 5)
            .setScale(x * 0.002);

          store.dispatch(
            persistAddedScores({ name: username, score: data.score || 0 })
          );
        }
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
        this.scene.start('MainMenu', {});
      });
    }
  }

  update(data) {
    this.player.update();
    // Was trying to add some incentive for getting the phone in the end
    // if (this.hasPhone === true) {
    //   this.player.addScore(1000);
    // }
    // this.hasPhone = false;
  }

  createPlayer(playerInfo) {
    this.player = new Lisa(this, this.x, this.y).setPosition(100, 560);
  }

  addOtherPlayers(playerInfo) {
    this.otherPlayer = new Lisa(this, playerInfo.x, playerInfo.y).setPosition(
      100,
      560
    );
    this.otherPlayer.setTint(Math.random() * 0xffffff);
    this.otherPlayer.playerId = playerInfo.playerId;
    this.otherPlayers.add(this.otherPlayer);
  }
}

export default PromisedLandFirst;
