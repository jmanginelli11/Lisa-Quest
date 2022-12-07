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

  // this.enemyFollows();
  // Following Enemy AI
  // enemyFollows() {
  //   this.scene.physics.moveToObject(this.body, this.player, 100);
  // }
}
