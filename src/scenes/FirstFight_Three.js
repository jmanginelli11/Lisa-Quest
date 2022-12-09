import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class FirstFight_Three extends Scene {
  cameras;
  player;
  platforms;
  portal;
  waterFallPlatform;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'FirstFight_Three' });
  }

  create(data) {
    // Background - First Scene(3)

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    // this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);

    this.map = this.make.tilemap({ key: 'tilemap_FF3' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.mechanicalTileset = this.map.addTilesetImage(
      'mechanical_tileset',
      'mechanical'
    );

    this.machineRoomTileset = this.map.addTilesetImage(
      'machine_room_tileset1',
      'security_cam'
    );

    this.machineRoomTilesetTwo = this.map.addTilesetImage(
      'machine_room_tileset2',
      'boss_tileset1'
    );

    this.machineRoomTilesetThree = this.map.addTilesetImage(
      'machine_room_tileset3',
      'boss_tileset2'
    );

    this.invisibleLayer = this.map.createLayer(
      'invisible_layer',
      this.machineRoomTilesetThree,
      0,
      0
    );

    this.firstLayer = this.map.createLayer('First', this.groundTileset, 0, 0);

    this.thirdLayer = this.map.createLayer(
      'Third',
      this.mechanicalTileset,
      0,
      0
    );

    this.sixthLayer = this.map.createLayer(
      'Sixth',
      this.machineRoomTileset,
      0,
      0
    );

    this.seventhLayer = this.map.createLayer(
      'Seventh',
      this.machineRoomTilesetThree,
      0,
      0
    );

    this.fourthLayer = this.map.createLayer(
      'Fourth',
      this.machineRoomTilesetTwo,
      0,
      0
    );

    this.secondLayer = this.map.createLayer(
      'Second',
      this.machineRoomTilesetTwo,
      0,
      0
    );

    //Lisa
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      1200,
      100
    );

    // Display adjustments
    this.firstLayer.displayWidth = this.sys.canvas.width;
    this.firstLayer.displayHeight = this.sys.canvas.height;
    this.secondLayer.displayWidth = this.sys.canvas.width;
    this.secondLayer.displayHeight = this.sys.canvas.height;
    this.thirdLayer.displayWidth = this.sys.canvas.width;
    this.thirdLayer.displayHeight = this.sys.canvas.height;
    this.fourthLayer.displayWidth = this.sys.canvas.width;
    this.fourthLayer.displayHeight = this.sys.canvas.height;
    this.sixthLayer.displayWidth = this.sys.canvas.width;
    this.sixthLayer.displayHeight = this.sys.canvas.height;
    this.seventhLayer.displayWidth = this.sys.canvas.width;
    this.seventhLayer.displayHeight = this.sys.canvas.height;
    this.invisibleLayer.displayWidth = this.sys.canvas.width;
    this.invisibleLayer.displayHeight = this.sys.canvas.height;

    //Collisions
    // this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.physics.add.collider(this.player, this.invisibleLayer);
    this.physics.add.collider(this.player, this.firstLayer);

    // this.f.setCollisionBetween(142, 170);
    this.invisibleLayer.setCollisionBetween(139, 160);

    // this.groundAndPlatforms.setCollisionBetween(720, 746);

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    // spawning little enemy guy

    this.time.addEvent({
      delay: 11000,
      callback: function () {
        this.spawn2 = new Enemy(
          this,
          Phaser.Math.RND.between(300, 700),
          200
        ).setScale(1.5);

        this.enemiesArray.push(this.spawn2);
        this.physics.add.collider(this.spawn2, this.wallPlatform);
        this.physics.add.collider(this.spawn2, this.invisibleLayer);
        this.physics.add.overlap(
          this.player,
          this.spawn2,
          this.player.hitSpawn,
          null,
          this
        );
        this.physics.add.collider(this.player, this.spawn2);
      },
      callbackScope: this,
      repeat: 9,
    });

    //spawning fly guy

    this.time.addEvent({
      delay: 10000,
      callback: function () {
        this.flyGuy = new FlyGuy(
          this,
          Phaser.Math.RND.between(300, 700),
          200
        ).setScale(1.5);

        this.enemiesArray.push(this.flyGuy);
        this.physics.add.collider(this.flyGuy, this.wallPlatform);
        this.physics.add.collider(this.flyGuy, this.invisibleLayer);
        this.physics.add.overlap(
          this.player,
          this.flyGuy,
          this.player.hitSpawn,
          null,
          this
        );
        this.physics.add.collider(this.player, this.flyGuy);
      },
      callbackScope: this,
      repeat: 9,
    });

    this.time.addEvent({
      delay: 10000,
      callback: this.spawnHearts,
      callbackScope: this,
      repeat: 19,
    });

    // Adding portal
    this.portal = this.physics.add
      .sprite(innerWidth - 140, innerHeight - 200, 'portal')
      .setScale(4)
      .setVisible(false);
    this.portal.setCollideWorldBounds(true);
    this.physics.add.collider(this.portal, this.groundAndPlatforms);

    this.portal.play('portalPlay');
  }

  update(data) {
    this.player.update();

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }

    if (this.player.heartCount >= 1) {
      this.portal.setVisible(true);
      this.physics.add.collider(this.player, this.portal, () => {
        this.scene.start('BossFight', {
          hp: this.player.hp,
          score: this.player.score,
          timer: this.timer,
        });
      });
    }
  }

  spawnHearts() {
    //healthHearts
    this.hearts = this.physics.add.group({
      key: 'heart',
      // repeat: 0,
      allowGravity: true,
      setXY: { x: 0, y: 350, stepX: 300 },
    });

    this.physics.add.collider(this.hearts, this.wallPlatform);
    this.physics.add.collider(this.hearts, this.invisibleLayer);
    this.hearts.children.iterate(function (child) {
      // for (var i = 0; i < 5; i++) {
      child.setPosition(
        Phaser.Math.RND.between(300, 700),
        Phaser.Math.RND.between(200, 500)
      );
      child.setBounce(1),
        child.setOrigin(0, 0),
        child.setVelocity(Phaser.Math.Between(-200, 200)),
        child.setCollideWorldBounds(true);
      // }
    });

    this.physics.add.overlap(
      this.player,
      this.hearts,
      this.player.collectHeart,
      null,
      this
    );
  }

  gameOver(data) {
    this.scene.start('GameOver', {
      music: data.music,
      hp: this.player.hp,
      score: this.player.score,
      timer: this.timer,
    });
  }
}

export default FirstFight_Three;
