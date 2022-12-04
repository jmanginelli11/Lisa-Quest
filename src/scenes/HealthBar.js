import { Scene } from 'phaser';
import { Lisa } from './Lisa';

class HealthBar extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;
  bar;

  constructor() {
    super({ key: 'HealthBar' });
  }

  init() {
    this.fullWidth = 300;
  }
  create() {
    const x = 200;
    const y = 240;
    this.background = this.add.image(innerWidth / 2, innerHeight / 2, 'stars');
    // this.background.setPosition(
    //   this.cameras.main.centerX,
    //   this.cameras.main.centerY
    // );

    //shadow bar
    const leftShaddowCap = this.add
      .image(x, y, 'left-cap-shadow')
      .setOrigin(0, 0.5);
    const middleShaddowCap = this.add
      .image(leftShaddowCap.x + leftShaddowCap.width, y, 'middle-shadow')
      .setOrigin(0, 0.5);
    middleShaddowCap.displayWidth = this.fullWidth;
    this.add
      .image(
        middleShaddowCap.x + middleShaddowCap.displayWidth,
        y,
        'right-cap-shadow'
      )
      .setOrigin(0, 0.5);

    //health bar
    this.leftCap = this.add.image(x, y, 'left-cap').setOrigin(0, 0.5);
    this.middle = this.add
      .image(this.leftCap.x + this.leftCap.width, y, 'middle')
      .setOrigin(0, 0.5);
    this.rightCap = this.add
      .image(this.middle.x + this.middle.displayWidth, y, 'right-cap')
      .setOrigin(0, 0.5);

    this.setMeterPercentage(1);
    // this.setMeterPercentageAnimated(0);
  }
  setMeterPercentage(percent = 1) {
    const width = this.fullWidth * percent;

    this.middle.displayWidth = width;
    this.rightCap.x = this.middle.x + this.middle.displayWidth;
  }

  //animation
  setMeterPercentageAnimated(percent = 1, duration = 1000) {
    const width = this.fullWidth * percent;

    this.tweens.add({
      targets: this.middle,
      displayWidth: width,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.rightCap.x = this.middle.x + this.middle.displayWidth;

        this.leftCap.visible = this.middle.displayWidth > 0;
        this.middle.visible = this.middle.displayWidth > 0;
        this.rightCap.visible = this.middle.displayWidth > 0;
      },
    });
  }
}

export default HealthBar;
