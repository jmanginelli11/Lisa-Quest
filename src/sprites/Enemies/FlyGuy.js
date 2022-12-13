import Phaser from 'phaser';
import { Sprite } from 'phaser';
import { EnemiesParent } from './EnemiesParent';

export class FlyGuy extends EnemiesParent {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot');

    this.setPosition(x, y);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setGravityY(300);
    this.body.setCollideWorldBounds(true);

    this.play('flyguy-idle');

    this.init();
  }

  init() {
    this.is_in_knockback = false;
    this.current_knockback_speed = 0;
    this.hp = 3;
  }

  update() {
    if (this.hp > 0) {
      // Descend if way above player and not close horizontally
      if (
        this.scene.player &&
        this.x >= this.scene.player.body.x + innerWidth * 0.2
      ) {
        this.body.setVelocityX(-150);
        if (this.body.y <= this.scene.player.body.y - innerHeight * 0.25) {
          this.body.setVelocityY(500);
        } else {
          this.body.setVelocityY(50);
        }
      } else if (
        this.scene.player &&
        this.x <= this.scene.player.body.x - innerWidth * 0.2
      ) {
        this.body.setVelocityX(150);
        if (this.body.y <= this.scene.player.body.y - innerHeight * 0.25) {
          this.body.setVelocityY(500);
        } else {
          this.body.setVelocityY(50);
        }
      } else if (this.scene.player) {
        this.enemyFollows();
      }

      // Knockback
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

  // Following Enemy AI
  enemyFollows() {
    this.scene.physics.moveToObject(this, this.scene.player, 200);
  }
}
