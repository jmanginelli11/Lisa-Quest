import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class BossFight extends Scene {
  cameras;
  player;
  platforms;
  waterFallPlatform;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'BossFight' });
  }

  create(data) {
    // Background - Boss Fight

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    this.map = this.make.tilemap({ key: 'tilemap_BF' });

    this.bossRoomTilesetOne = this.map.addTilesetImage(
      'machine_room_tileset2',
      'boss_tileset1'
    );

    this.bossRoomTilesetTwo = this.map.addTilesetImage(
      'machine_room_tileset3',
      'boss_tileset2'
    );

    this.secondLayer = this.map.createLayer(
      'Second',
      this.bossRoomTilesetOne,
      0,
      0
    );

    this.thirdLayer = this.map.createLayer(
      'Third',
      this.bossRoomTilesetTwo,
      0,
      0
    );

    this.firstLayer = this.map.createLayer(
      'First',
      this.bossRoomTilesetOne,
      0,
      0
    );

    //Lisa
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      100,
      560
    );

    //Colliders
    this.physics.add.collider(this.player, this.firstLayer);
    this.firstLayer.setCollisionBetween(160, 170);
    this.firstLayer.displayWidth = this.sys.canvas.width;
    this.firstLayer.displayHeight = this.sys.canvas.height;
    this.secondLayer.displayWidth = this.sys.canvas.width;
    this.secondLayer.displayHeight = this.sys.canvas.height;

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let wallPlatform = this.platforms
      .create(this.sys.canvas.width - 100, this.sys.canvas.height, 'test2')
      .refreshBody();
    this.physics.add.collider(this.player, wallPlatform, () => {
      this.scene.start('PromisedLand', {
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    wallPlatform.setVisible(false);
  }

  update(data) {
    this.player.update();

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }
  }

  gameOver(data) {
    this.scene.start('Form', {
      music: data.music,
      hp: this.player.hp,
      score: this.player.score,
      timer: this.timer,
    });
  }
}

export default BossFight;
