import Phaser from 'phaser';

export class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      classType: Laser,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: 'laser',
    });
  }
  shootLaserRight(x, y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.shootRight(x, y);
    }
  }
  shootLaserLeft(x, y) {
    const laser = this.getFirstDead(false);
    if (laser) {
      laser.shootLeft(x, y);
    }
  }
}

class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
  }
  shootLeft(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(-900);
  }
  shootRight(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(900);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
