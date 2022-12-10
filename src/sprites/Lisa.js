import { Sprite } from 'phaser';

export class Lisa extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, hp = null, score = null, heartCount = null) {
    super(scene, x, y, 'lisa');

    // Making the homie
    this.play('idle');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Player Config
    this.setScale(x / 250);
    this.body.setGravityY(450);
    this.body.setCollideWorldBounds(true);

    // If we have HP and Score data
    if (hp) this.hp = hp;
    else this.hp = 10;
    if (hp > 20) this.hp = 20;
    if (score) this.score = score;
    else this.score = 0;
    if (heartCount) this.heartCount = heartCount;
    else this.heartCount = 0;

    //Method calls for creation
    this.init();
    this.create();

    // console.log('scene passed to Lisa: ', this.scene);
    // console.log('the big lisa: ', this);
  }

  init() {
    //Variables
    this.is_run = false;
    this.is_idle = false;
    this.is_dash = false;
    this.is_punch = false;
    this.is_in_knockback = false;
    this.is_shoot = false;

    this.has_air_jump = false;
    this.can_dash = true;

    this.current_knockback_speed = 0;

    this.max_hp = 10;

    this.is_immune = false;

    // Declarations
    this.colliderLaser;
    this.colliderPunch;
    this.cursors;
    this.explosion;
    this.shadow_bar;
    this.hb_text;
    this.real_bar;
  }

  create() {
    // Create Input Event
    this.cursors = this.scene.input.keyboard;

    // Look in this function, after one animation is completed
    this.on('animationcomplete', (event) => {
      try {
        if (
          event.key == 'punch' ||
          event.key == 'super-punch' ||
          event.key == 'dash' ||
          event.key == 'shoot'
        ) {
          this.anims.play('idle', true);
          this.is_punch = false;
          this.is_dash = false;
          this.is_shoot = false;
          if (this.colliderPunch) this.colliderPunch.destroy(true);
          if (this.colliderLaser) this.colliderLaser.destroy(true);
        }
      } catch (e) {
        console.log(e);
      }
    });

    // key objects
    this.cursors.keyobj_z = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.Z
    );
    this.cursors.keyobj_x = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.X
    );
    this.cursors.keyobj_c = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.C
    );
    this.cursors.keyobj_up = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.cursors.keyobj_down = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.cursors.keyobj_left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.cursors.keyobj_right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.cursors.keyobj_shift = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    // Score
    this.scoreText = this.scene.add.text(
      this.x * 0.1,
      this.y * 0.1,
      'Score: ' + this.score,
      {
        fontSize: '32px',
        fill: '#E43AA4',
      }
    );

    // HealthBar Creation
    // console.log('x and y: ', this.x, ' ', this.y);

    this.hb_text = this.scene.add.text(
      innerWidth * 0.05,
      innerHeight * 0.125,
      'LISA'
    );
    this.shadow_bar = this.makeHealthBar(
      innerWidth * 0.05,
      innerHeight * 0.15,
      0xc1c1c1
    );
    this.real_bar = this.makeHealthBar(
      innerWidth * 0.05,
      innerHeight * 0.15,
      0x2e71cc
    );

    this.setHBValue(this.real_bar, this.hp);

    // Sounds
  }

  update() {
    // Move Left
    if (this.cursors.keyobj_left.isDown) {
      if (!this.is_punch && !this.is_dash && !this.is_shoot) {
        this.body.setVelocityX(-500);
        if (this.body.blocked.down && !this.anims.isPlaying) {
          this.anims.play('run');
        }

        this.flipX = true;
      }

      // Move Right
    } else if (this.cursors.keyobj_right.isDown) {
      if (!this.is_punch && !this.is_dash && !this.is_shoot) {
        this.body.setVelocityX(500);
        if (this.body.blocked.down && !this.anims.isPlaying) {
          this.anims.play('run');
        }

        this.flipX = false;
      }

      // Idle
    } else {
      if (!this.is_punch && !this.is_dash && !this.is_shoot) {
        this.body.setVelocityX(0);

        this.anims.play('idle', true);
      }
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

    // Grounded Jump
    if (Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_up)) {
      this.body.setVelocityY(-450);
    }

    // Aerial Jump
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_up) &&
      !this.body.blocked.down
    ) {
      this.body.setVelocityY(-250);
      this.has_air_jump = false;
    }

    // Rising
    if (
      !this.body.blocked.down &&
      this.body.velocity.y < 0 &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.anims.play('rising');
    }

    // Falling
    if (
      !this.body.blocked.down &&
      this.body.velocity.y > 0 &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.anims.play('falling');
    }

    // Fast-falling
    if (
      this.cursors.keyobj_down.isDown &&
      this.body.velocity.y < 100 &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.body.setVelocityY(400);
    }

    // Ground Dash
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_c) &&
      this.can_dash &&
      this.body.blocked.down
    ) {
      this.can_dash = false;
      this.dashAnimation();
    }

    // Re-enable dash
    if (!Phaser.Input.Keyboard.DownDuration(this.cursors.keyobj_c, 500)) {
      this.can_dash = true;
    }

    // Super-Punch
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_x) &&
      this.body.blocked.down &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.attackAnimation('super-punch');
    }

    // Punch
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_z) &&
      this.body.blocked.down &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.attackAnimation('punch');
    }

    // Shoot
    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.keyobj_shift) &&
      this.body.blocked.down &&
      !this.is_punch &&
      !this.is_dash &&
      !this.is_shoot
    ) {
      this.body.setVelocityX(0);
      this.attackAnimation('shoot');
    }

    // Reset Jumps
    if (this.body.blocked.down) {
      this.has_air_jump = true;
    }
  }

  attackAnimation(attack) {
    if (attack === 'shoot') {
      this.is_shoot = true;
      this.hitbox = this.scene.add
        .sprite(this.x, this.y)
        .setDepth(-1)
        .setScale(0.5)
        .setAngle(this.flipX ? -45 : 45);

      // Needs hysics to move with laser
      this.scene.add.existing(this.hitbox);
      this.scene.physics.add.existing(this.hitbox);

      this.anims.play(attack);

      this.flipX
        ? this.attackCalculation(-300, attack)
        : this.attackCalculation(300, attack);

      this.hitbox.once('animationcomplete', () => {
        this.hitbox.destroy();
      });
    } else {
      this.is_punch = true;
      this.anims.play(attack);

      if (attack === 'super-punch') {
        this.hitbox = this.scene.add
          .sprite(this.x, this.y - this.body.height / 2)
          .setDepth(-1)
          .setScale(0.2)
          .setAngle(this.flipX ? -45 : 45);

        this.colliderPunch = this.scene.add.rectangle(
          this.flipX ? this.x - this.x * 0.1 : this.x + this.x * 0.1,
          this.y,
          this.width / 0.6,
          this.height / 0.6
        );

        this.flipX
          ? this.body.setVelocityX(-200) &&
            this.attackCalculation(-1000, attack)
          : this.body.setVelocityX(200) && this.attackCalculation(1000, attack);
      }
      if (attack === 'punch') {
        this.hitbox = this.scene.add
          .sprite(this.x, this.y - this.body.height / 2)
          .setDepth(-1)
          .setScale(0.2)
          .setAngle(this.flipX ? -45 : 45);

        this.colliderPunch = this.scene.add.rectangle(
          this.flipX ? this.x - this.x * 0.1 : this.x + this.x * 0.1,
          this.y,
          this.width / 0.6,
          this.height / 0.6
        );

        this.flipX
          ? this.body.setVelocityX(-200) && this.attackCalculation(-500, attack)
          : this.body.setVelocityX(200) && this.attackCalculation(500, attack);
      }

      this.hitbox.once('animationcomplete', () => {
        this.hitbox.destroy();
      });
    }
  }

  attackCalculation(knockbackVal, attack) {
    if (attack === 'shoot') {
      this.colliderLaser = this.scene.add.rectangle(this.x, this.y, 60, 60);
      this.scene.physics.add.existing(this.colliderLaser);

      // Direction
      if (this.flipX) {
        this.scene.laserGroup.shootLaserLeft(this.x, this.y);
        this.colliderLaser.body.setVelocityX(-1400);
        this.hitbox.body.setVelocityX(-1400);
      } else {
        this.scene.laserGroup.shootLaserRight(this.x, this.y);
        this.colliderLaser.body.setVelocityX(1400);
        this.hitbox.body.setVelocityX(1400);
      }

      // Collision, knockback, health deprecation
      for (let i = 0; i < this.scene.enemiesArray.length; i++) {
        if (
          this.scene.physics.overlap(
            this.scene.enemiesArray[i],
            this.colliderLaser
          )
        ) {
          this.scene.enemiesArray[i].is_in_knockback = true;
          this.scene.enemiesArray[i].current_knockback_speed = knockbackVal;
          this.scene.enemiesArray[i].body.setVelocityX(knockbackVal);

          // Knockingback enemiesArray[i]
          if (knockbackVal <= 0) {
            this.scene.enemiesArray[i].body.setVelocityY(knockbackVal / 1.8);
          } else {
            this.scene.enemiesArray[i].body.setVelocityY(knockbackVal / -1.8);
          }

          // HP and Score
          if (this.scene.enemiesArray[i].hp > 1) {
            this.scene.enemiesArray[i].hp--;
            console.log('hit! hp: ', this.scene.enemiesArray[i].hp);

            if (knockbackVal <= 0) {
              this.addScore(knockbackVal * -0.05);
            } else {
              this.addScore(knockbackVal * 0.05);
            }
          } else if (this.scene.enemiesArray[i].hp <= 1) {
            if (knockbackVal <= 0) {
              this.addScore(knockbackVal * -0.05);
            } else {
              this.addScore(knockbackVal * 0.05);
            }

            this.addScore(100);
            this.scene.enemiesArray[i].hp--;
          }
        }
      }
    } else if (attack === 'punch' || attack === 'super-punch') {
      // calculating hitbox by attack
      this.colliderPunch = this.scene.add.rectangle(
        this.flipX ? this.x - this.x * 0.1 : this.x + this.x * 0.1,
        this.y,
        60,
        60
      );

      this.scene.physics.add.existing(this.colliderPunch);
      this.colliderPunch.body.setImmovable(true);
      this.colliderPunch.body.allowGravity = false;

      // Loop through enemiesArray in scene
      for (let i = 0; i < this.scene.enemiesArray.length; i++) {
        if (
          this.scene.physics.overlap(
            this.scene.enemiesArray[i],
            this.colliderPunch
          )
        ) {
          this.scene.enemiesArray[i].is_in_knockback = true;
          this.scene.enemiesArray[i].current_knockback_speed = knockbackVal;
          this.scene.enemiesArray[i].body.setVelocityX(knockbackVal);

          // Knockingback enemiesArray[i]
          if (knockbackVal <= 0) {
            this.scene.enemiesArray[i].body.setVelocityY(knockbackVal / 1.8);
          } else {
            this.scene.enemiesArray[i].body.setVelocityY(knockbackVal / -1.8);
          }

          // HP and Score
          if (this.scene.enemiesArray[i].hp > 1) {
            this.scene.enemiesArray[i].hp--;

            if (knockbackVal <= 0) {
              this.addScore(knockbackVal * -0.05);
            } else {
              this.addScore(knockbackVal * 0.05);
            }
          } else if (this.scene.enemiesArray[i].hp <= 1) {
            if (knockbackVal <= 0) {
              this.addScore(knockbackVal * -0.05);
            } else {
              this.addScore(knockbackVal * 0.05);
            }

            this.addScore(100);
            this.scene.enemiesArray[i].hp--;
          }

          if (this.colliderPunch) this.colliderPunch.destroy();
        }
      }
    }
  }

  dashAnimation() {
    this.is_dash = true;
    this.anims.play('dash');
    this.flipX ? this.body.setVelocityX(-1200) : this.body.setVelocityX(1200);
  }

  addScore(num) {
    this.score += num;
    this.scoreText.setText('Score:' + this.score);
  }

  // Health Bar Zone
  makeHealthBar(x, y, color) {
    //blue = 0x2e71cc
    //red = 0xCC2E3A
    //grey = 0xc1c1c1

    let bar = this.scene.add.graphics();

    bar.fillStyle(color, 1);
    bar.fillRoundedRect(0, 0, 200, 20, 5);

    bar.x = x;
    bar.y = y;
    return bar;
  }

  setHBValue(bar, hp) {
    //scales the real_bar
    if (hp >= 0 && hp <= 20) {
      bar.scaleX = hp / 20;
    }
  }

  hitSpawn(player, spawn) {
    // console.log('before', player.hp);
    if (!player.is_immune) {
      player.is_immune = true;
      player.hp = Phaser.Math.Clamp(player.hp - 1, 0, 20);
      // console.log('after', player.hp);
      player.setHBValue(player.real_bar, player.hp);
      this.time.addEvent({
        delay: 500,
        callback: function () {
          player.is_immune = false;
        },
        callbackScope: this,
      });
    }
  }

  hitSpikyPlant(player) {
    if (!player.is_immune) {
      player.is_immune = true;
      player.hp = Phaser.Math.Clamp(player.hp - 1, 0, 20);
      // console.log('after', player.hp);
      player.setHBValue(player.real_bar, player.hp);
    }
    player.is_immune = false;
  }

  // Collecting Hearts
  collectHeart(player, heart) {
    heart.disableBody(true, true);

    player.hp = Phaser.Math.Clamp(player.hp + 1, 0, 20);

    player.setHBValue(player.real_bar, player.hp);
    player.addScore(20);
    player.heartCount++;
  }
}
