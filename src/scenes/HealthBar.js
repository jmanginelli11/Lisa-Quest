import { Scene } from 'phaser';

class HealthBar extends Scene {
  constructor() {
    super({ key: 'HealthBar' });
  }
  preload() {
    this.load.image(
      'left-cap',
      '/assets/uipack-space/PNG/barHorizontal_blue_left.png'
    );
    this.load.image(
      'middle',
      '/assets/uipack-space/PNG/barHorizontal_blue_mid.png'
    );
    this.load.image(
      'right-cap',
      '/assets/uipack-space/PNG/barHorizontal_blue_right.png'
    );

    this.load.image(
      'left-cap-shadow',
      '/assets/uipack-space/PNG/barHorizontal_shadow_left.png'
    );
    this.load.image(
      'middle-shadow',
      '/assets/uipack-space/PNG/barHorizontal_shadow_mid.png'
    );
    this.load.image(
      'right-cap-shadow',
      '/assets/uipack-space/PNG/barHorizontal_shadow_right.png'
    );
  }
  init() {
    this.fullWidth = 300;
  }
  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'stars');

    //shadow bar
    const leftShaddowCap = this.add
      .image(x, y, 'left-cap-shadow')
      .setOrigin(0, 0.5);
    const middleShaddowCap = this.add
      .image(leftShadowCap.x + leftShadowCap.width, y, 'middle-shadow')
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
  }
  setMeterPercentage(percent = 1) {
    const width = this.fullWidth * percent;

    this.middle.displayWidth = widththis.rightCap.x =
      this.middle.x + this.middle.displayWidth;
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
