import Phaser from "phaser";

class Fire extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fire");
  }
  shoot(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityX(-900);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.x <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}

export class FireGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
  }
  create() {
    this.createMultiple({
      classType: Fire,
      frameQuantity: 30,
      active: false,
      visible: false,
      key: "fire",
    });
  }

  shootFire(x, y) {
    const fire = this.getFirstDead(false);
    if (fire) {
      fire.shoot(x, y);
    }
  }
}