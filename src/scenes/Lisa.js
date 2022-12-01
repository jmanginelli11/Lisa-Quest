import { Sprite, physics } from 'phaser';

export class Lisa extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'lisa');

    this.setPosition(x, y);
    // this.aura = this.scene.add.sprite(this.body.x, this.body.y, 'hp_block');

    this.play('idle');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // player Config
    this.setScale(3.5);
    this.body.setGravityY(350);
    this.body.setCollideWorldBounds(true);

    //Method calls for creation
    this.init();
    this.create();
  }

  init() {
    //Variables
    this.is_run = false;
    this.is_idle = false;
  }

  create() {
    // Create Input Event
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    console.log('cursors: ', this.cursors);
  }

  update() {
    // Idling and basic movement
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-500);

      if (this.body.touching.down && !this.anims.isPlaying) {
        this.anims.play('dash', true);
        this.anims.chain('run');
      }

      this.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(500);

      if (this.body.touching.down && !this.anims.isPlaying) {
        this.anims.play('dash', true);
        this.anims.chain('run');
      }

      this.flipX = false;
    } else {
      if (this.body.velocity.x <= 160 || this.body.velocity.x >= -160) {
        this.body.setVelocityX(0);
      }

      if (this.body.touching.down) {
        this.anims.play('idle');
      }
    }

    // Jumping
    if (this.cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-420);
      this.anims.play('rising');
    }

    // Falling
    if (!this.body.touching.down && this.body.velocity.y > 0) {
      this.anims.play('falling');
    }

    // Fast-falling
    if (this.cursors.down.isDown && this.body.velocity.y < 100) {
      this.body.setVelocityY(100);
    }
  }
}
