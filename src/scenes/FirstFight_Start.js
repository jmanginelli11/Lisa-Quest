import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy';

class FirstFight_Start extends Scene {
  cameras;
  player;
  platforms;
  wallPlatform;
  portal;
  laserGroup;
  enemiesArray = [];
  // heartCount = 0;

  constructor(data) {
    super({ key: 'FirstFight_Start' });
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

    this.time.addEvent({
      delay: 5000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });

    //Background
    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.sun.displayWidth = this.sys.canvas.width;
    this.sun.displayHeight = this.sys.canvas.height;

    //Tilemaps
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

    this.invisibleLayer = this.map.createLayer(
      'invisible_layer',
      this.rocksAndPlantsTileset,
      0,
      0
    );

    this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    //creating lisa behind the plants
    this.player = new Lisa(this, x, y, data.hp, data.score).setPosition(100);

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
    this.invisibleLayer.displayWidth = this.sys.canvas.width;
    this.invisibleLayer.displayHeight = this.sys.canvas.height;
    this.physics.add.collider(
      this.player,
      this.invisibleLayer,
      this.player.hitSpikyPlant
    );

    this.physics.add.collider(this.player, this.groundAndPlatforms);

    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.setCollisionBetween(743, 746);
    this.invisibleLayer.setCollisionBetween(139, 170);
    //
    // text
    this.story = this.add.text(x, y - 300, '').setScale(1.25);

    this.typewriteText(
      `What have we here? Fly guys I hate these ones...                \nI can't seem to get out of here... I think I have to \ncollect three hearts for a door to appear...                       `
    );

    this.laserGroup = new LaserGroup(this);

    // Gun placeholder
    // this.gun = this.add.image(x + 150, y - 225, 'c');

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

    // spawning fly guy
    this.time.addEvent({
      delay: 8000,
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
      repeat: 5,
    });

    //healthHearts spawning every 10 seconds

    this.time.addEvent({
      delay: 5000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });

    // create portal and set invisible
    this.portal = this.physics.add
      .sprite(innerWidth, -500, 'portal')
      .setScale(4)
      .setVisible(false);
    this.portal.setCollideWorldBounds(true);
    this.physics.add.collider(this.portal, this.groundAndPlatforms);

    this.portal.play('portalPlay');
  }

  update(data) {
    this.player.update();

    // if (this.key_P.isDown) {
    //   console.log('trying to pause');
    //   this.physics.pause();
    // }

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }

    if (this.player.heartCount >= 1) {
      this.portal.setVisible(true);
      this.physics.add.collider(this.player, this.portal, () => {
        this.scene.start('FirstFight_Two', {
          hp: this.player.hp,
          score: this.player.score,
          timer: this.timer,
        });
      });
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
        Phaser.Math.RND.between(0, 2000),
        Phaser.Math.RND.between(400, 600)
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
}

export default FirstFight_Start;
