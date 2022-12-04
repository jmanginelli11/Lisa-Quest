import { Scene, physics } from 'phaser';

import { Lisa } from './Lisa';
// import HealthBarSprite from './HealthBarSprite';

class GameSceneTester extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;
  healthBarTest;

  constructor() {
    super({ key: 'GameSceneTester' });
  }
  // init() {
  //   this.fullWidth = 300;
  // }
  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.background = this.add.image(x, y, 'shiny_stars');
    this.surface = this.add.image(x, y, 'surface');

    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
    });

    let timeTextStyle = {
      font: '24px Roboto',
      fill: '#E43AA4',
      stroke: '#000',
      strokeThickness: 4,
    };
    this.timer = this.add.text(16, 16, 'Time: ', timeTextStyle);

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y);

    // Test platform (needed for char testing)

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // this.bar = new HealthBarSprite(this, x, y)
    //make 3 bars
    let healthBar = this.makeBar(140, 100, 0x2e71cc);
    this.setValue(healthBar, 100);
  }

  update(time) {
    // Update Player
    this.player.update();

    // Do enemy AI
    this.enemy.anims.play('enemy-idle');
    this.enemyFollows();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  // Following Enemy AI
  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }

  // createHealthBar(x, y) {
  //   this.leftCap = this.add.image(x, y, 'left-cap').setOrigin(0, 0.5);
  //   this.middle = this.add
  //     .image(this.leftCap.x + this.leftCap.width, y, 'middle')
  //     .setOrigin(0, 0.5);
  //   this.rightCap = this.add
  //     .image(this.middle.x + this.middle.displayWidth, y, 'right-cap')
  //     .setOrigin(0, 0.5);
  // }
  //healthbar size
  // setMeterPercentage(percent = 1) {
  //   const width = this.fullWidth * percent;

  //   this.middle.displayWidth = width;
  //   this.rightCap.x = this.middle.x + this.middle.displayWidth;
  // }
  //healthbar animation
  // setMeterPercentageAnimated(percent = 1, duration = 1000) {
  //   const fullWidth = 300;
  //   const width = this.fullWidth * percent;

  //   this.tweens.add({
  //     targets: this.middle,
  //     displayWidth: width,
  //     duration,
  //     ease: Phaser.Math.Easing.Sine.Out,
  //     onUpdate: () => {
  //       this.rightCap.x = this.middle.x + this.middle.displayWidth;

  //       this.leftCap.visible = this.middle.displayWidth > 0;
  //       this.middle.visible = this.middle.displayWidth > 0;
  //       this.rightCap.visible = this.middle.displayWidth > 0;
  //     },
  //   });
  // }
  makeBar(x, y, color) {
    //blue = 0x2e71cc
    //red = 0xCC2E3A

    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    bar.fillRoundedRect(0, 0, 200, 35);
    //position
    bar.x = x;
    bar.y = y;
    return bar;
  }
  setValue(bar, percentage) {
    //scale the bar
    bar.scaleX = percentage / 100;
  }
}

export default GameSceneTester;
