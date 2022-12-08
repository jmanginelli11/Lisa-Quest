import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy';
import { BigBoss } from '../sprites/Enemies/BigBoss.js';
import { FireGroup } from '../weapons/Fire/FireGroup.js';

class BigBossRoom extends Scene {
  cameras;
  player;
  bigBoss;
  platforms;
  wallPlatform;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'BigBossRoom' });
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
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.shakeCameras();

    // this.music = this.sound.add('boss');
    // this.musicConfig = {
    //   mute: 0,
    //   volume: 0.45,
    //   loop: true,
    // };
    // data.music.stop();
    // this.music.play('boss');

    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.sun.displayWidth = this.sys.canvas.width;
    this.sun.displayHeight = this.sys.canvas.height;
    this.map = this.make.tilemap({ key: 'tilemap_FF' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'rock_and_plants_tileset',
      'vegetation2'
    );

    this.groundAndPlatforms = this.map.createLayer(
      'ground_and_platforms',
      this.groundTileset,
      0,
      0
    );

    //creating lisa behind the plants
    this.player = new Lisa(this, x, y, data.hp, data.score);

    // // new BigBoss
    // this.bigBoss = new BigBoss(
    //   this,
    //   x,
    //   y,
    //   this.player,
    //   this.fireGroup
    // ).setScale(4);

    // new laser Group
    this.fireGroup = new FireGroup(this);

    this.rocksAndPlants = this.map.createLayer(
      'rocks_and_plants',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.groundAndPlatforms.displayWidth = this.sys.canvas.width;
    this.groundAndPlatforms.displayHeight = this.sys.canvas.height;
    this.rocksAndPlants.displayWidth = this.sys.canvas.width;
    this.rocksAndPlants.displayHeight = this.sys.canvas.height;

    this.physics.add.collider(this.player, this.groundAndPlatforms);
    // this.physics.add.collider(this.bigBoss, this.groundAndPlatforms);

    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.setCollisionBetween(743, 746);

    // text
    this.story = this.add.text(x + 260, y - 300, '').setScale(1.25);

    this.typewriteText(
      '                \nIs this...  \n                \n... the big boss room? \n                \n '
    );

    // invisible platform
    this.platforms = this.physics.add.staticGroup();
    this.wallPlatform = this.platforms
      .create(this.sys.canvas.width, this.sys.canvas.height - 100, 'test2')
      .refreshBody();

    this.physics.add.collider(this.player, this.wallPlatform, () => {
      // this.music.stop();
      // data.music.play();
      this.scene.start('PromisedLandFirst', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    // .rotation(90);
    this.wallPlatform.setVisible(false);

    this.laserGroup = new LaserGroup(this);

    // //Spawn guy
    // this.spawn = new Enemy(this, Phaser.Math.RND.between(0, 1400), y);

    // this.physics.add.collider(this.spawn, this.wallPlatform);
    // this.physics.add.collider(this.spawn, this.groundAndPlatforms);
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawn,
    //   this.player.hitSpawn,
    //   null,
    //   this
    // );
    // this.physics.add.collider(this.player, this.spawn);

    // //spawn guy 2
    // this.spawnArray = [];
    // for (let i = 0; i < 5; i++) {
    //   this.spawn2 = new Enemy(this, Phaser.Math.RND.between(0, 1600), 0);

    //   this.spawnArray.push(this.spawn2);
    //   this.physics.add.collider(this.spawn2, this.wallPlatform);
    //   this.physics.add.collider(this.spawn2, this.groundAndPlatforms);
    //   this.physics.add.overlap(
    //     this.player,
    //     this.spawn2,
    //     this.player.hitSpawn,
    //     null,
    //     this
    //   );
    //   this.physics.add.collider(this.player, this.spawn2);
    // }

    // spawning big boss
    this.time.addEvent({
      delay: 10000,
      callback: function () {
        this.bigBoss = new BigBoss(this, x, y - 200).setScale(3);
        this.enemiesArray.push(this.bigBoss);
        this.physics.add.collider(this.bigBoss, this.wallPlatform);
        this.physics.add.collider(this.bigBoss, this.groundAndPlatforms);
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
      delay: 10000,
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
  }

  update(data) {
    this.player.update();
    // this.spawn.update();

    // for (let i = 0; i < this.spawnArray.length; i++) {
    //   this.spawnArray[i].update();
    // }
    // this.spawn2.update();

    // console.log(data.hp);
    if (this.player.hp <= 0) {
      // this.music.stop();
      // data.music.play();
      this.gameOver(data);
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }
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
    this.scene.start('Form', {
      music: data.music,
      hp: this.player.hp,
      score: this.player.score,
      timer: this.timer,
    });
  }

  shakeCameras() {
    this.cameras.main.shake(5000);
  }
}

export default BigBossRoom;
