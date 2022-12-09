import Phaser from 'phaser';
// import { FireGroup } from '../../weapons/Fire/FireGroup.js';
import { Sprite } from 'phaser';
import { EnemiesParent } from './EnemiesParent';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';

export class BigBoss extends EnemiesParent {
  constructor(scene, x, y) {
    super(scene, x, y, 'bigBoss');

    this.setPosition(x, y + 300);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setGravityY(300);
    this.body.setCollideWorldBounds(true);

    this.direction = 'right';
    this.play('bigBossWalk');
    this.is_walk = true;

    this.init();
  }

  init() {
    this.is_in_knockback = false;
    this.current_knockback_speed = 0;
    this.hp = 5;
  }

  update() {
    if (this.hp > 0) {
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
        // this.scene.sound.play('fire');
        this.scene.fireGroup.shootFireRight(this.x, this.y);
      }

      if (
        this.direction === 'left' &&
        this.body.x - this.scene.player.body.x <= 200
      ) {
        this.body.setVelocityX(-500);
        // this.scene.sound.play('fire');
        this.scene.fireGroup.shootFireLeft(this.x, this.y);
      }

      //Knockback
      if (this.is_in_knockback) {
        if (this.current_knockback_speed <= 0) {
          this.is_in_knockback = false;
        }
        this.body.setVelocityX(
          this.body.velocity.x + this.current_knockback_speed
        );
        this.current_knockback_speed -= 5;
      }
    } else {
      this.destroy();
    }
  }
}
