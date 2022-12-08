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

  constructor(data) {
    super({ key: 'GameScene' });
  }

  create(data) {
    // this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    // this.scale.setUserScale(0.7, 0.7, 0, 0);
    // this.scale.displaySize.setAspectRatio(width / height);
    // this.scale.refresh();
    // const { width, height } = this;

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    // let mainMenuButton = this.add
    //   .image(x / 2, y * 1.8, 'main-menu')
    //   .setScale(3);
    // mainMenuButton.setInteractive();

    // mainMenuButton.on('pointerup', () => {
    //   this.scene.switch('MainMenu');
    // });

    this.story = this.add.text(x - 500, y - 200, '').setScale(1.25);

    this.typewriteText(
      "                \nLooks like I can move around with the arrow keys... \n                \nAnd fast run with the C key? Wa wa wee wa...\n                \nOh boy, these fists they have so much power with the X and especially the Z keys.\n                \nAnd I guess I can shoot lasers with SHIFT too? Neato\n                \nI guess when I'm ready I jump through this... waterfall... alright.\n                \nI have to find the secret sauce to ending climate change and defeat the capitalists\n                \nso let's go!"
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
    this.player = new Lisa(this, x, y).setPosition(100);

    //ADD SOMETHING TO MAKE TORI APPEAR WHEN IN TWO PLAYER MODE
    // this.add.text(x + 400, innerHeight / 14, 'TORI');
    // this.makeBar(x + 400, innerHeight / 10, 0xc1c1c1);
    // let toriHealth = this.makeBar(x + 400, innerHeight / 10, 0xcc2e3a);
    // this.setValue(toriHealth, 5);

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
      setXY: { x: 300, y: 350, stepX: 300 },
    });
    // this.hearts.children.iterate(function (child) {
    //   for (var i = 0; i < 5; i++) {
    //     child.setPosition(
    //       Phaser.Math.RND.between(0, 1600),
    //       Phaser.Math.RND.between(400, 600)
    //     );
    //     child.setOrigin(0, 0);
    //   }
    // });

    this.physics.add.overlap(
      this.player,
      this.hearts,
      this.player.collectHeart,
      null,
      this
    );

    //spawning rigs

    // this.rigs = this.physics.add.group({
    //   key: 'rig',
    //   repeat: 5,
    // });

    // this.rigs.children.iterate(function (rig) {
    //   for (let i = 0; i < 5; i++) {
    //     rig.setPosition(
    //       Phaser.Math.RND.between(0, 1400),
    //       Phaser.Math.RND.between(0, 600)
    //     );
    //   }
    // });

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
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    this.waterFallPlatform.setVisible(false);

    // creating the enemy sprite
    // this.enemy = new FlyGuy(this, x, y, this.player).setScale(1.7);

    // laserGroup
    this.laserGroup = new LaserGroup(this);

    // Collider so enemy and player can interact
    // this.physics.add.collider(this.player, this.enemy);

    //enemies spawning at timed intervals
    // for (let i = 0; i < 3; i++) {
    //   this.time.addEvent({
    //     delay: 3000,
    //     callback: this.spawnEnemy,
    //     callbackScope: this,
    //   });
    // }
    // this.spawn = new Enemy(
    //   this,
    //   Phaser.Math.RND.between(0, 1400),
    //   Phaser.Math.RND.between(0, 600)
    // );

    // this.physics.add.collider(this.spawn, this.groundLayer);
    // this.physics.add.overlap(
    //   this.player,
    //   this.spawn,
    //   this.player.hitSpawn,
    //   null,
    //   this
    // );
    // this.physics.add.collider(this.player, this.spawn);
    // this.spawns = this.time.addEvent({
    //   delay: 3000,
    //   callback: this.spawnEnemy,
    //   callbackScope: this,
    //   loop: true,
    // });
    // this.spawnEnemy();

    console.log('here is player', this.player);
    console.log('here is data', data);
    if (this.player.hp <= 0) {
      this.gameOver();
    }
  }

  update(time) {
    this.player.update();

    // this.enemy.update();
    // this.spawn.update();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  gameOver() {
    this.scene.start('Form', {
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
