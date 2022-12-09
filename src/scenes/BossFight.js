import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy';
import { BigBoss } from '../sprites/Enemies/BigBoss.js';
import { FireGroup } from '../weapons/Fire/FireGroup.js';

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

  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.story.text += text[i];
        i++;
      },
      repeat: length - 1,
      delay: 6000,
    });
  }

  create(data) {
    // Background - Boss Fight

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //camera shake
    this.shakeCameras();

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    // new laser Group
    this.fireGroup = new FireGroup(this);

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

    // text
    this.story = this.add.text(x + 260, y - 300, '').setScale(1.25);

    this.typewriteText(
      '                \nIs this...  \n                \n... the big boss room? \n                \n '
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

    // spawning big boss
    this.time.addEvent({
      delay: 7000,
      callback: function () {
        this.bigBoss = new BigBoss(this, x, y - 200).setScale(3);
        this.enemiesArray.push(this.bigBoss);
        this.physics.add.collider(this.bigBoss, this.wallPlatform);
        this.physics.add.collider(this.bigBoss, this.firstLayer);
        this.physics.add.overlap(
          this.player,
          this.bigBoss,
          this.player.hitSpawn,
          null,
          this
        );
        this.physics.add.collider(this.player, this.bigBoss);
      },
      callbackScope: this,
      loop: false,
    });

    //spawning fly guy
    this.time.addEvent({
      delay: 30000,
      callback: function () {
        this.flyGuy = new FlyGuy(
          this,
          Phaser.Math.RND.between(0, 1400),
          0
        ).setScale(1.5);
        this.enemiesArray.push(this.flyGuy);
        this.physics.add.collider(this.flyGuy, this.wallPlatform);
        this.physics.add.collider(this.flyGuy, this.groundAndPlatforms);
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
      loop: true,
    });

    //healthHearts spawning every 10 seconds
    this.time.addEvent({
      delay: 10000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });

    //fire raining down
    this.time.addEvent({
      delay: 8000,
      callback: this.spawnFire,
      callbackScope: this,
      loop: true,
    });
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

  spawnFire() {
    this.fire = this.physics.add.group({
      key: 'fire',
      allowGravity: true,
    });
    this.fire.children.iterate(function (child) {
      child.setPosition(Phaser.Math.RND.between(0, 1600), 0);
    });
    this.physics.add.overlap(
      this.player,
      this.fire,
      this.player.hitSpawn,
      null,
      this
    );
  }

  spawnHearts() {
    this.hearts = this.physics.add.group({
      key: 'heart',
      // repeat: 1,
      allowGravity: false,
    });
    this.hearts.children.iterate(function (child) {
      child.setPosition(
        Phaser.Math.RND.between(0, 1600),
        Phaser.Math.RND.between(400, 900)
      );
      child.setOrigin(0, 0);
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

  shakeCameras() {
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.cameras.main.shake(1000);
      },
      callbackScope: this,
    });
    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.cameras.main.shake(1000);
      },
      callbackScope: this,
    });
  }
}

export default BossFight;
