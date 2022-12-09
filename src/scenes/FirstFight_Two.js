import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class FirstFight_Two extends Scene {
  cameras;
  player;
  platforms;
  wallPlatform;
  laserGroup;
  enemiesArray = [];

  constructor(data) {
    super({ key: 'FirstFight_Two' });
  }

  create(data) {
    // Background - First Scene

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.sun.displayWidth = this.sys.canvas.width;
    this.sun.displayHeight = this.sys.canvas.height;
    this.map = this.make.tilemap({ key: 'tilemap_FF2' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.rocksAndPlantsTileset = this.map.addTilesetImage(
      'plants_rocks_tileset',
      'vegetation2'
    );

    this.rocksAndPlantsTilesetTwo = this.map.addTilesetImage(
      'plants_rocks_tileset_2',
      'vegetation1'
    );

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

    //Lisa
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(
      100,
      560
    );

    this.rocksAndPlants = this.map.createLayer(
      'rocks_and_plants_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.rocksAndPlantsTwo = this.map.createLayer(
      'rocks_and_plants_layer_2',
      this.rocksAndPlantsTilesetTwo,
      0,
      0
    );

    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.displayWidth = this.sys.canvas.width;
    this.groundAndPlatforms.displayHeight = this.sys.canvas.height;

    // this.groundAndPlatforms.setCollisionBetween(720, 746);

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    //healthHearts
    this.hearts = this.physics.add.group({
      key: 'heart',
      repeat: 5,
      allowGravity: true,
      setXY: { x: 300, y: 0 },
    });

    this.physics.add.collider(this.hearts, this.wallPlatform);
    this.physics.add.collider(this.hearts, this.groundAndPlatforms);
    this.hearts.children.iterate(function (child) {
      for (var i = 0; i < 5; i++) {
        child.setBounce(1),
          child.setOrigin(0, 0),
          child.setVelocity(Phaser.Math.Between(-200, 200)),
          child.setCollideWorldBounds(true);
      }
    });

    this.physics.add.overlap(
      this.player,
      this.hearts,
      this.player.collectHeart,
      null,
      this
    );

    //baddies
    // this.spawnArray = [];
    this.time.addEvent({
      delay: 5000,
      callback: function () {
        this.spawn2 = new Enemy(
          this,

          Phaser.Math.RND.between(0, 2000),
          0
        ).setScale(1.5);
        this.enemiesArray.push(this.spawn2);
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
      repeat: 10,
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

    if (this.player.heartCount >= 3) {
      this.platforms = this.physics.add.staticGroup();
      this.wallPlatform = this.platforms
        .create(this.sys.canvas.width, this.sys.canvas.height, 'test')
        .refreshBody();

      this.physics.add.collider(this.player, this.wallPlatform, () => {
        this.scene.start('FirstFight_Three', {
          hp: this.player.hp,
          score: this.player.score,
          timer: this.timer,
        });
      });
      this.wallPlatform.setVisible(true);
    }
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

export default FirstFight_Two;
