import { Scene, physics } from 'phaser';
import HealthBar from '../helpers/HealthBar.js';
import { Lisa } from '../sprites/Lisa.js';
import { FlyGuy } from '../sprites/Enemies/FlyGuy.js';
// import HealthBarSprite from './HealthBarSprite';

class GameScene extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;

  bar;

  map;
  groundLayer;
  surfaceTileset;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
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

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
    });

    //timer
    let timeTextStyle = {
      font: '24px Roboto',
      fill: '#E43AA4',
      stroke: '#000',
      strokeThickness: 4,
    };
    this.timer = this.add
      .text(x, innerHeight / 10, 'Time: ', timeTextStyle)
      .setOrigin(0.5, 0.5);

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y);

    // Create player's healthBar
    this.add.text(x - 600, innerHeight / 14, 'LISA');
    this.makeBar(x - 600, innerHeight / 10, 0xc1c1c1);

    let lisaHealth = this.makeBar(x - 600, innerHeight / 10, 0x2e71cc);
    //need this function to fire every time player.hp increments or decrements
    this.setValue(lisaHealth, this.player.hp);

    //ADD SOMETHING TO MAKE TORI APPEAR WHEN IN TWO PLAYER MODE
    this.add.text(x + 400, innerHeight / 14, 'TORI');
    this.makeBar(x + 400, innerHeight / 10, 0xc1c1c1);
    let toriHealth = this.makeBar(x + 400, innerHeight / 10, 0xcc2e3a);
    this.setValue(toriHealth, 5);

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

    this.hearts = this.physics.add.group({
      key: 'heart',
      repeat: 5,
      allowGravity: false,
    });
    this.hearts.children.iterate(function (child) {
      for (var i = 0; i < 5; i++) {
        child.setPosition(
          Phaser.Math.RND.between(0, 1400),
          Phaser.Math.RND.between(0, 600)
        );
        child.setOrigin(0, 0);
      }
    });

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
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 60, this.sys.canvas.height, 'test')
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.switch('FallingScene');
    });
    waterFallPlatform.setVisible(false);

    // creating the enemy sprite

    this.enemy = new FlyGuy(this, x, y, this.player).setScale(1.7);
    // this.bar = new HealthBarSprite(this, x, y);

    // Collider so enemy and player can interact
    this.physics.add.collider(this.player, this.enemy);
  }

  update(time) {
    // Update Player
    this.player.update();
    // this.enemy.update();

    // // Do enemy AI
    this.enemyFollows();

    //healthbar changing
    // this.lisaHealth.update();
    // this.setValue(this.lisaHealth, this.player.hp);

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  // Following Enemy AI
  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }

  // healthBar Maker
  makeBar(x, y, color) {
    //blue = 0x2e71cc
    //red = 0xCC2E3A
    //grey = 0xc1c1c1

    let bar = this.add.graphics();

    bar.fillStyle(color, 1);
    bar.fillRoundedRect(0, 0, 200, 20, 5);

    bar.x = x;
    bar.y = y;
    return bar;
  }
  setValue(bar, hp) {
    //scale the bar
    // 10 is assumed to be Lisa's max hp

    bar.scaleX = hp / 10;
  }

  //increment and decrement health
  collectHeart(player, heart) {
    heart.disableBody(true, true);

    console.log('before increment', this.player, this.player.hp);
    this.player.hp += 1;
    console.log('after increment', this.player.hp);
    // const bar = player
    // this.setValue(lisaHealth, this.player.hp);
  }
}

export default GameScene;
