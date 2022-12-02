import { Sprite } from "phaser";

export class BigBoss extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bigBoss");

    this.setPosition(x, y + 300);

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setGravityY(300);
    this.body.setCollideWorldBounds(true);

    this.direction = "right";
    // this.enemyWeapon = this.add.weapon(5, "fire");
    // this.play("bigBossWalk");
  }

  update() {
    if (this.body.blocked.right) {
      this.direction = "left";
    }

    if (this.body.blocked.left) {
      this.direction = "right";
    }

    if (this.direction === "left") {
      // console.log(this.scene.player.body.x);
      this.flipX = false;
      this.play("bigBossWalk");
      this.body.setVelocityX(-200);
    }

    if (this.direction === "right") {
      this.flipX = true;
      this.play("bigBossWalk");
      this.body.setVelocityX(200);
    }

    if (
      this.direction === "right" &&
      this.body.x - this.scene.player.body.x <= 200
    ) {
      this.play("bigBossRun");
      this.body.setVelocityX(500);
    }

    if (
      this.direction === "left" &&
      this.body.x - this.scene.player.body.x <= 200
    ) {
      this.play("bigBossRun");
      this.body.setVelocityX(-500);
    }
    // this.play("bigBossWalk");
  }
}
