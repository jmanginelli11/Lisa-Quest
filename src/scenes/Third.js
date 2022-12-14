import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';
import { Enemy } from '../sprites/Enemies/Enemy';
import { FlyGuy } from '../sprites/Enemies/FlyGuy';
import WebFontFile from '../helpers/fontLoader';

class Third extends Scene {
  cameras;
  player;
  platforms;
  wallPlatform;
  portal;
  laserGroup;
  enemiesArray = [];
  isPaused = false;

  // heartCount = 0;

  constructor(data) {
    super('Third');
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

  spawnHearts() {
    this.hearts = this.physics.add.group({
      key: 'heart',
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

  preload() {
    // this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.time.addEvent({
      delay: 6000,
      callback: this.spawnHearts,
      callbackScope: this,
      loop: true,
    });

    //Background
    this.sun = this.add.image(0, 0, 'sun').setOrigin(0, 0);
    this.sun.displayWidth = this.sys.canvas.width;
    this.sun.displayHeight = this.sys.canvas.height;

    //Tilemap
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

    //Creating lisa behind the plants
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

    // Text

    this.story = this.add
      .text(x - x / 9, y - y / 1.3, '', {
        fontSize: 22,
        color: '#E43AA4',
      })
      .setScale(x * 0.0015);

    this.typewriteText(
      `                \nDon't touch the spiky plants!                \nSomething tells me I must kill at least 3 enemies \nand collect at least 3 hearts...                       `
    );

    this.laserGroup = new LaserGroup(this);

    // spawning goomba guys
    this.time.addEvent({
      delay: 7000,
      callback: function () {
        this.goomba = new Enemy(
          this,
          Phaser.Math.RND.between(0, 1400),
          0
        ).setScale(1.5);
        this.enemiesArray.push(this.goomba);
        this.physics.add.collider(this.goomba, this.wallPlatform);
        this.physics.add.collider(this.goomba, this.groundAndPlatforms);
        this.physics.add.overlap(
          this.player,
          this.goomba,
          this.player.hitSpawn,
          null,
          this
        );
        this.physics.add.collider(this.player, this.goomba);
      },
      callbackScope: this,
      repeat: 5,
    });

    // create portal and set invisible
    this.portal = this.physics.add
      .sprite(innerWidth, y, 'portal')
      .setScale(x * 0.0062)
      .setVisible(false);
    this.portal.setCollideWorldBounds(true);
    this.physics.add.collider(this.portal, this.groundAndPlatforms);

    this.portal.play('portalPlay');

    console.log('enemiesArray: ', this.enemiesArray);
    this.enemiesArray = [];
  }

  update(data) {
    this.player.update();

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    for (let i = 0; i < this.enemiesArray.length; i++) {
      this.enemiesArray[i].update();
    }

    if (this.player.heartCount >= 3 && this.player.enemiesKilled >= 3) {
      this.portal.setVisible(true);
      this.physics.add.collider(this.player, this.portal, () => {
        this.scene.start('Fourth', {
          hp: this.player.hp,
          score: this.player.score,
          timer: this.timer,
        });
      });
    }
    this.enemiesArray = this.enemiesArray.filter((enemy) => enemy.hp > 0);
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

export default Third;
