import { Scene, physics } from 'phaser';
import { Lisa } from './Lisa';

class GameScene extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'stars');

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
    });

    let timeTextStyle = {
      font: '24px Roboto',
      fill: '#E43AA4',
      stroke: '#000',
      strokeThickness: 4,
    };
    this.timer = this.add.text(16, 16, 'Time: ', timeTextStyle);

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y);

    // this.player = this.physics.add.sprite(x, y, 'lisa').setScale(3.5);
    console.log(this.player);

    // Test platform (needed for char testing)
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(x, innerHeight - 200, 'ground')
      .setScale(4)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    // Idling and basic movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-500);

      if (this.player.body.touching.down && !this.player.anims.isPlaying) {
        this.player.anims.play('dash', true);
        this.player.anims.chain('run');
      }

      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(500);

      if (this.player.body.touching.down && !this.player.anims.isPlaying) {
        this.player.anims.play('dash', true);
        this.player.anims.chain('run');
      }

      this.player.flipX = false;
    } else {
      if (
        this.player.body.velocity.x <= 160 ||
        this.player.body.velocity.x >= -160
      ) {
        this.player.body.setVelocityX(0);
      }

      if (this.player.body.touching.down) {
        this.player.anims.play('idle');
      }
      this.enemy.anims.play('enemy-idle');
    }

    // Jumping
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.setVelocityY(-420);
      this.player.anims.play('rising');
    }

    // Falling
    if (!this.player.body.touching.down && this.player.body.velocity.y > 0) {
      this.player.anims.play('falling');
    }

    // Fast-falling
    if (this.cursors.down.isDown && this.player.body.velocity.y < 100) {
      this.player.body.setVelocityY(100);
    }

    // Do enemy AI
    this.enemyFollows();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  // Following Enemy AI
  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }
}

export default GameScene;
