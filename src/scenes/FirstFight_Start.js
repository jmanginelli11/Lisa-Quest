import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import { Enemy } from '../sprites/Enemies/Enemy';

class FirstFight_Start extends Scene {
  cameras;
  player;
  platforms;
  wallPlatform;
  laserGroup;

  constructor(data) {
    super({ key: 'FirstFight_Start' });
  }

  create(data) {
    console.log(data);
    // Background - First Scene

    const x = innerWidth / 2;
    const y = innerHeight / 2;

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
    // this.groundAndPlatforms.setCollisionBetween(27, 79);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.setCollisionBetween(743, 746);

    // invisible platform
    this.platforms = this.physics.add.staticGroup();
    this.wallPlatform = this.platforms
      .create(this.sys.canvas.width, this.sys.canvas.height - 100, 'test2')
      .refreshBody();

    this.physics.add.collider(this.player, this.wallPlatform, () => {
      this.scene.start('FirstFight_Two', {
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    // .rotation(90);
    this.wallPlatform.setVisible(false);

    this.laserGroup = new LaserGroup(this);

    //Spawn guy
    this.spawn = new Enemy(
      this,
      Phaser.Math.RND.between(0, 1400),
      Phaser.Math.RND.between(0, 600)
    );

    this.physics.add.collider(this.spawn, this.wallPlatform);
    this.physics.add.collider(this.spawn, this.groundAndPlatforms);
    this.physics.add.overlap(
      this.player,
      this.spawn,
      this.player.hitSpawn,
      null,
      this
    );
    this.physics.add.collider(this.player, this.spawn);

    //spawn guy 2
    this.spawnArray = [];
    for (let i = 0; i < 5; i++) {
      this.spawn2 = new Enemy(
        this,
        Phaser.Math.RND.between(0, 1400),
        Phaser.Math.RND.between(0, 600)
      );
      this.spawnArray.push(this.spawn2);
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
    }

    //healthHearts spawning every 10 seconds
    this.time.addEvent({
      delay: 10000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.player.update();
    this.spawn.update();

    for (let i = 0; i < this.spawnArray.length; i++) {
      this.spawnArray[i].update();
    }
    // this.spawn2.update();
  }

  spawnHearts() {
    this.hearts = this.physics.add.group({
      key: 'heart',
      // repeat: 1,
      allowGravity: false,
    });
    this.hearts.children.iterate(function (child) {
      child.setPosition(
        Phaser.Math.RND.between(0, 1400),
        Phaser.Math.RND.between(0, 600)
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
}

export default FirstFight_Start;
