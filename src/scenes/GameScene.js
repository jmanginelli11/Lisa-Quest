import { Scene, physics } from 'phaser';
// import { loadAnims, lisaSprite, loadSpritesheets } from './Lisa';

class GameScene extends Scene {
  player;
  platforms;
  cursors;

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

    this.player = this.physics.add.sprite(x, y, 'lisa').setScale(3.5);
    this.player.setCollideWorldBounds(true);

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
      frameRate: 12,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('lisa', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Idling and basic movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-400);

      // this.player.anims.play('dash', true);
      this.player.anims.play('run', true);

      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(400);

      // this.player.anims.play('dash', true);
      this.player.anims.play('run', true);

      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('idle');
    }
  }
}

export default GameScene;
