import Phaser from 'phaser';
// import { FireGroup } from '../../weapons/Fire/FireGroup.js';
import { Sprite } from 'phaser';

export class BigBoss extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bigBoss');

    this.setPosition(x, y + 300);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setGravityY(300);
    this.body.setCollideWorldBounds(true);

    this.direction = 'right';
    this.play('bigBossWalk');
    console.log('here is this', this);
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

    if (
      this.direction === 'right' &&
      this.body.x - this.scene.player.body.x >= -200
    ) {
      this.body.setVelocityX(500);
    }

    if (
      this.direction === 'left' &&
      this.body.x - this.scene.player.body.x <= 200
    ) {
      this.body.setVelocityX(-500);
      this.scene.fireGroup.shootFire(this.x, this.y);
    }
  }
}
