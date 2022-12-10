import { Scene, physics } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';
import { FlyGuy } from '../sprites/Enemies/FlyGuy.js';
import { Enemy } from '../sprites/Enemies/Enemy.js';
import { LaserGroup } from '../weapons/Fire/Laser/LaserGroup.js';

class GameScene extends Scene {
  player;
  laserGroup;
  enemy;
  platforms;
  waterFallPlatform;
  cursors;
  timer;
  bar;
  map;
  groundLayer;
  surfaceTileset;
  direction = 'right';
  enemiesArray = [];
  isPaused = false;

  constructor(data) {
    super({ key: 'GameScene' });
  }

  create(data) {
    this.cameras.main.fadeIn(2000, 255, 255, 255);

    this.scale.displaySize.setAspectRatio(16 / 9);
    this.scale.refresh();

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.story = this.add.text(x - 500, y - 200, '').setScale(1.25);

    // this.key_P = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    //PAUSE BUTTON
    let pauseButton = this.add.text(x, innerHeight / 10, 'PAUSE').setScale(2);
    pauseButton.setInteractive();

    pauseButton.on('pointerup', () => {
      // this.scene.start('PauseScene', );

      this.isPaused = !this.isPaused;
      if (!this.isPaused) {
        // pauseButton = this.add.text(x, innerHeight / 10, 'RESUME').setScale(2);
        this.game.loop.sleep();
      } else {
        // pauseButton = this.add.text(x, innerHeight / 10, 'PAUSE').setScale(2);
        this.game.loop.wake();
      }

      console.log('pause button pressed');
    });

    this.typewriteText(
      "                \nLooks like I can move around with the arrow keys... \n                \nAnd fast run with the C key? Wa wa wee wa...\n                \nOh boy, these fists they have so much power with the Z and especially the X keys.\n                \nAnd I guess I can shoot lasers with SHIFT too? Neato\n                \nI should probably avoid hitting the deadly spiky plants I see off in the distance\n                \nWhen I'm ready I jump through this... waterfall... alright.\n                \nMy communicator got destroyed in the crash landing and I have to find a new one\n                \nso that I can tell the people back home about this planet!\n"
    );

    //timer
    let timeTextStyle = {
      font: '24px Roboto',
      fill: '#E43AA4',
      stroke: '#000',
      strokeThickness: 4,
    };
    this.timer = this.add
      .text(x, innerHeight / 10, 'Time: ', timeTextStyle)
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y).setPosition(0, 0);

    //Background - First Scene
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.surfaceTileset = this.map.addTilesetImage('surface', 'tiles');
    this.vegetationOneTileset = this.map.addTilesetImage(
      'vegetation',
      'vegetation1'
    );

    this.vegetationTwoTileset = this.map.addTilesetImage(
      'vegetation_color',
      'vegetation2'
    );

    this.groundLayer = this.map.createLayer(
      'ground',
      this.surfaceTileset,
      0,
      0
    );
    this.vegetationLayerOne = this.map.createLayer(
      'vegetation',
      this.vegetationOneTileset,
      0,
      0
    );
    this.vegetationLayerTwo = this.map.createLayer(
      'vegetation_color',
      this.vegetationTwoTileset,
      0,
      0
    );

    //healthHearts
    this.hearts = this.physics.add.group({
      key: 'heart',
      repeat: 4,
      allowGravity: false,
      setXY: { x: 300, y: 400, stepX: 300 },
    });

    this.physics.add.overlap(
      this.player,
      this.hearts,
      this.player.collectHeart,
      null,
      this
    );

    //resizing to fit the playable game scene
    this.groundLayer.displayWidth = this.sys.canvas.width;
    this.groundLayer.displayHeight = this.sys.canvas.height;
    this.vegetationLayerOne.displayWidth = this.sys.canvas.width;
    this.vegetationLayerOne.displayHeight = this.sys.canvas.height;
    this.vegetationLayerTwo.displayWidth = this.sys.canvas.width;
    this.vegetationLayerTwo.displayHeight = this.sys.canvas.height;

    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.player, this.surfaceTileset);
    this.groundLayer.setCollisionBetween(72, 99);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    this.waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 60, this.sys.canvas.height, 'test')
      .refreshBody();

    this.physics.add.collider(this.player, this.waterFallPlatform, () => {
      this.scene.start('FallingScene_One', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    this.waterFallPlatform.setVisible(false);

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    if (this.player.hp <= 0) {
      this.gameOver(data);
    }

    // this.input.on('pointerup', function () {
    //   this.scene.pause();
    // });
    //trying to set spacebar as a useable
    // this.cursors = this.input.keyboard;
    // this.cursors.pauseKey = this.input.keyboard.addKey(
    //   Phaser.Input.Keyboard.KeyCodes.SPACEBAR
    // );
  }

  update(time) {
    this.player.update();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  gameOver(data) {
    this.scene.start('GameOver', {
      music: data.music,
      hp: this.player.hp,
      score: this.player.score,
      timer: this.timer,
    });
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

  // spawnEnemy() {
  //   let counter = 3;
  //   counter--;

  //   if (counter > 0) {
  //     this.spawn = new Enemy(
  //       this,
  //       Phaser.Math.RND.between(0, 1400),
  //       Phaser.Math.RND.between(0, 600)
  //     );
  //     this.physics.add.collider(this.spawn, this.groundLayer);
  //     // this.physics.add.collider(this.player, this.spawn);
  //     this.physics.add.overlap(
  //       this.player,
  //       this.spawn,
  //       this.player.hitSpawn,
  //       null,
  //       this
  //     );
  //   }
  // }
}

export default GameScene;
