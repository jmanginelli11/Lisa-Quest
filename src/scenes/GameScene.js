import { Scene, physics } from 'phaser';
// import { loadAnims, lisaSprite, loadSpritesheets } from './Lisa';

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

    this.player = this.physics.add.sprite(x, y, 'lisa').setScale(3.5);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravity(400);

    // Test platform (needed for char testing)
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(x, innerHeight - 400, 'ground')
      .setScale(4)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    this.anims.create({
      key: 'idle',
      frames: [{ key: 'lisa', frame: 0 }],
      frameRate: 12,
    });
    this.anims.create({
      key: 'rising',
      frames: [{ key: 'lisa', frame: 1 }],
      frameRate: 12,
    });
    this.anims.create({
      key: 'falling',
      frames: [{ key: 'lisa', frame: 2 }],
      frameRate: 12,
    });
    this.anims.create({
      key: 'dash',
      frames: this.anims.generateFrameNumbers('lisa', { start: 3, end: 7 }),
      frameRate: 20,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('lisa', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy-idle',
      frames: this.anims.generateFrameNumbers('bot', { start: 20, end: 23 }),
      frameRate: 12,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time) {
    // Idling and basic movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500);

      if (this.player.body.touching.down && !this.player.anims.isPlaying) {
        this.player.anims.play('dash', true);
        this.player.anims.chain('run');
      }

      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500);

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
        this.player.setVelocityX(0);
      }

      if (this.player.body.touching.down) {
        this.player.anims.play('idle');
      }
      this.enemy.anims.play('enemy-idle');
    }

    // Jumping & Falling
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-420);
      this.player.anims.play('rising');
    }
    if (!this.player.body.touching.down && this.player.body.velocity.y > 0) {
      this.player.anims.play('falling');
    }
    this.enemyFollows();

    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }
}

export default GameScene;
