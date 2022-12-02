import { Sprite } from 'phaser';

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'grenadeGuy');

    this.setPosition(x, y);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setGravityY(300);
    this.body.setCollideWorldBounds(true);

    this.direction = 'right';
    this.play('grenadeRun');

    this.init();
  }

  init() {
    this.is_in_knockback = false;
    this.current_knockback_speed = 0;
  }

  update() {
    if (this.body.blocked.right) {
      this.direction = 'left';
    }

    if (this.body.blocked.left) {
      this.direction = 'right';
    }

    if (this.direction === 'left') {
      this.flipX = false;
      this.body.setVelocityX(-200);
    }

    if (this.direction === 'right') {
      this.flipX = true;
      this.body.setVelocityX(200);
    }
  }
}
