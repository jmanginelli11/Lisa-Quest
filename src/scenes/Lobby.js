import store from '../store';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import WebFontFile from '../helpers/fontLoader';
import { persistAddedScores } from '../store/redux/scoresReducer';
import { isAllOf } from '@reduxjs/toolkit';

class Lobby extends Scene {
  platforms;
  player;
  otherPlayer;
  // otherPlayers;
  x = innerWidth / 2;
  y = innerHeight / 2;
  // hasPhone = false;

  constructor(data) {
    super({ key: 'Lobby' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    this.socket = io();
    this.otherPlayers = this.physics.add.group();

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

    this.groundLayer.setCollisionBetween(165, 171);

    if (this.player) {
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
  }

  createPlayer(playerInfo) {
    this.player = new Lisa(this, this.x, this.y).setPosition(100, 560);

    this.container = this.add.container(this.x, this.y);
    this.container.setSize(16, 16);
    this.physics.world.enable(this.container);
    this.container.add(this.player);

    this.container.body.setCollideWorldBounds(true);
    // Colliders
    this.physics.add.collider(this.player, this.groundLayer);
  }

  addOtherPlayers(playerInfo) {
    this.otherPlayer = new Lisa(this, this.x, this.y).setPosition(100, 560);
    // this.otherPlayer.setCollideWorldBounds(true);
    this.physics.add.collider(this.otherPlayer, this.groundLayer);
    this.otherPlayer.setTint(Math.random() * 0xffffff);
    this.otherPlayer.playerId = playerInfo.playerId;
    this.otherPlayers.add(this.otherPlayer);
  }
}

export default Lobby;
