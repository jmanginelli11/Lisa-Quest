import { Sprite } from 'phaser';

export class Lisa extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y + 200, 'lisa');

    // For Health Bar?
    // this.aura = this.scene.add.sprite(this.body.x, this.body.y, 'hp_block');

    this.play('idle');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // player Config
    this.setScale(3.5);
    this.body.setGravityY(450);
    this.body.setCollideWorldBounds(true);

    //Method calls for creation
    this.init();
    this.create();

    console.log('the big lisa: ', this);
  }

  init() {
    //Variables
    this.is_run = false;
    this.is_idle = false;
    this.is_dash = false;
    this.is_punch = false;

    this.hp = 50;
    this.shield = 5;
    this.colliderPunch;
  }

  create() {
    // Create Input Event
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    // console.log('cursors: ', this.cursors);

    // Look in this function, after one animation is completed
    this.on('animationcomplete', (event) => {
      try {
        if (
          event.key == 'punch' ||
          event.key == 'super-punch' ||
          event.key == 'dash'
        ) {
          this.anims.play('idle', true);
          this.is_punch = false;
          this.is_dash = false;
          // this.colliderPunch.destroy(true);
        }
      } catch (e) {}
    });
  }

  update() {
    // Basic movement
    if (this.cursors.left.isDown) {
      if (!this.is_punch && !this.is_dash) {
        this.body.setVelocityX(-500);
        if (this.body.touching.down && !this.anims.isPlaying) {
          this.anims.play('run');
        }

        this.flipX = true;
      }
    } else if (this.cursors.right.isDown) {
      if (!this.is_punch && !this.is_dash) {
        this.body.setVelocityX(500);
        if (this.body.touching.down && !this.anims.isPlaying) {
          this.anims.play('run');
        }

        this.flipX = false;
      }
    } else {
      if (!this.is_punch && !this.is_dash) {
        this.body.setVelocityX(0);

        this.anims.play('idle', true);
      }
    }

    // Jumping
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-600);
      this.anims.play('rising');
    }

    // Falling
    if (!this.body.touching.down && this.body.velocity.y > 0) {
      this.anims.play('falling');
    }

    // Fast-falling
    if (this.cursors.down.isDown && this.body.velocity.y < 100) {
      this.body.setVelocityY(400);
    }

    // Ground Dash
    if (this.cursors.shift.isDown && this.body.touching.down) {
      this.dashAnimation();
    }

    // Attack
    if (this.cursors.space.isDown && this.body.touching.down) {
      this.attackAnimation('punch');
    }
  }

  attackAnimation(attack) {
    this.is_punch = true;
    this.hitbox = this.scene.add
      .sprite(this.x, this.y - this.body.height / 2)
      .setDepth(-1)
      .setScale(0.2)
      .setAngle(this.flipX ? -45 : 45);
    this.anims.play(attack);
    if (attack === 'super-punch') {
      this.flipX ? this.body.setVelocityX(-1000) : this.body.setVelocityX(1000);
    }

    console.log('anims: ', this.anims);
    console.log('hitbox: ', this.hitbox);

    this.hitbox.once('animationcomplete', () => {
      this.hitbox.destroy();
      // this.is_punch = false;
    });
  }

  dashAnimation() {
    this.is_dash = true;
    this.anims.play('dash');
    this.flipX ? this.body.setVelocityX(-1200) : this.body.setVelocityX(1200);
  }
}
