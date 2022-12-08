import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class FirstFight_Three extends Scene {
  cameras;
  player;
  platforms;
  waterFallPlatform;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'FirstFight_Three' });
  }

  create(data) {
    // Background - First Scene(3)
    this.stars = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    // laserGroup
    this.laserGroup = new LaserGroup(this);
    this.map = this.make.tilemap({ key: 'tilemap_FF3' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.mechanicalTileset = this.map.addTilesetImage(
      'mechanical_tileset',
      'mechanical'
    );

    this.groundAndPlatforms = this.map.createLayer(
      'ground_layer',
      this.groundTileset,
      0,
      0
    );

    this.mechanicalLayer = this.map.createLayer(
      'mechanical_layer',
      this.mechanicalTileset,
      0,
      0
    );

    this.player = new Lisa(this, x, y, data.hp, data.score);
    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.displayWidth = this.sys.canvas.width;
    this.groundAndPlatforms.displayHeight = this.sys.canvas.height;
    // this.groundAndPlatforms.setCollisionBetween(720, 746);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width - 57, this.sys.canvas.height, 'test2')
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.start('PromisedLandFirst', {
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    waterFallPlatform.setVisible(false);

    // spawning little enemy guy
    this.time.addEvent({
      delay: 11000,
      callback: function () {
        this.spawn2 = new Enemy(this, Phaser.Math.RND.between(0, 1400), 0);
        this.enemiesArray.push(this.spawn2);
        this.physics.add.collider(this.spawn2, this.wallPlatform);
        this.physics.add.collider(this.spawn2, this.groundAndPlatforms);
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
      loop: true,
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

    this.time.addEvent({
      delay: 10000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();

    if (this.player.hp <= 0) {
      this.gameOver();
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
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
    this.physics.add.collider(this.hearts, this.groundAndPlatforms);
    this.hearts.children.iterate(function (child) {
      // for (var i = 0; i < 5; i++) {
      child.setPosition(
        Phaser.Math.RND.between(0, 1400),
        Phaser.Math.RND.between(0, 600)
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

  gameOver() {
    this.scene.start('Form', {
      hp: this.player.hp,
      score: this.player.score,
      timer: this.timer,
    });
  }
}

export default FirstFight_Three;
