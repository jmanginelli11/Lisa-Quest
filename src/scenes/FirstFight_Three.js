import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import WebFontFile from '../helpers/fontLoader';

class FirstFight_Three extends Scene {
  cameras;
  player;
  platforms;
  portal;
  waterFallPlatform;
  laserGroup;
  enemiesArray = [];
  isPaused = false;

  constructor(data) {
    super('FirstFight_Three');
  }

  preload() {
    // this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.story.text += text[i];
        i++;
      },
      repeat: length - 1,
      delay: 50,
    });
  }

  create(data) {
    // Background - First Scene(3)

    const x = innerWidth / 2;
    const y = innerHeight / 2;

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

    this.invisibleLayerTwo = this.map.createLayer(
      'invisible_layer_2',
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

    // Text
    this.story = this.add.text(x - x / 9, y - y / 1.6, '').setScale(x * 0.002);

    this.typewriteText(
      'I need to find a communicator! \nThey must have it hidden it... \nI bet if I defeat the big boss \nI will find it... '
    );

    //PAUSE BUTTON
    let pauseButton = this.add
      .text(innerWidth - 200, innerHeight * 0.05, 'PAUSE')
      .setScale(2);
    pauseButton.setInteractive();

    pauseButton.on('pointerup', () => {
      this.isPaused = !this.isPaused;
      if (!this.isPaused) {
        this.game.loop.sleep();
      } else {
        this.game.loop.wake();
      }
    });

    //Lisa
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      x + x * 0.7,
      y - y * 0.5
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
    this.invisibleLayerTwo.displayWidth = this.sys.canvas.width;
    this.invisibleLayerTwo.displayHeight = this.sys.canvas.height;

    //Collisions
    // this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.physics.add.collider(this.player, this.invisibleLayer);
    this.physics.add.collider(this.player, this.invisibleLayerTwo);
    this.physics.add.collider(this.player, this.firstLayer);

    // this.f.setCollisionBetween(142, 170);
    this.invisibleLayer.setCollisionBetween(139, 160);
    this.invisibleLayerTwo.setCollisionBetween(160, 170);

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    // spawning little enemy guy

    this.time.addEvent({
      delay: 15000,
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
        this.story.setVisible(false);
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
      delay: 6000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });

    // Adding portal
    this.portal = this.physics.add
      .sprite(x + x / 1.4, y, 'portal')
      .setScale(x * 0.005)
      .setVisible(false);
    this.portal.setCollideWorldBounds(true);
    this.physics.add.collider(this.portal, this.invisibleLayer);

    this.portal.play('portalPlay');
  }

  update(data) {
    this.player.update();

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    this.enemiesKilledCount = [];
    this.enemiesKilledCount = this.enemiesArray.filter(
      (enemy) => enemy.hp <= 0
    );

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }

    if (this.player.heartCount >= 3 && this.enemiesKilledCount.length >= 6) {
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
      allowGravity: true,
      setXY: { x: 0, y: 350, stepX: 300 },
    });

    this.physics.add.collider(this.hearts, this.wallPlatform);
    this.physics.add.collider(this.hearts, this.invisibleLayer);
    this.hearts.children.iterate(function (child) {
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
