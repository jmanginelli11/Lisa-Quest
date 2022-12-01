import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  preload() {
    this.load.image('stars', '/assets/menu/stars_background.png');
    this.load.image('logo', '/assets/menu/logo.png');
    this.load.image('sky', '/assets/menu/sky.png');
    this.load.image('play-red', '/assets/menu/play_red.png');
    this.load.image('play-white', '/assets/menu/play_white.png');
    this.load.image('main-menu', '/assets/menu/mainMenu_white.png');
    this.load.image('ground', '/assets/platform.png');
    this.load.image('stars', '/assets/menu/stars_background.png');
    this.load.image('logo', '/assets/menu/logo.png');
    this.load.image('sky', '/assets/menu/sky.png');
    this.load.image('play-red', '/assets/menu/play_red.png');
    this.load.image('play-white', '/assets/menu/play_white.png');
    this.load.image('main-menu', '/assets/menu/mainMenu_white.png');

    this.load.image('credits', '/assets/menu/credits_white.png');

    this.load.image('credits-white', '/assets/menu/credits_white.png');
    this.load.image('credits-red', '/assets/menu/credits_red.png');
    this.load.image('creditsLOL', '/assets/menu/creditsLOL.png');

    // GameDev Sprites
    this.load.image('lauren', '/assets/gamedevs/lauren-idle1.png');
    this.load.image('jags', '/assets/gamedevs/jags-idle2.png');
    this.load.image('sheyla', '/assets/gamedevs/sheyla-idle2.png');
    this.load.image('naomi', '/assets/gamedevs/naomi-idle.png');

    // Lisa
    this.load.spritesheet('lisa', '/assets/lisa/default/lisa-spritesheet.png', {
      frameWidth: 36,
      frameHeight: 36,
    });

    // Evil Lisa
    this.load.spritesheet('lisa-alt', '/assets/lisa/alt/lisa-alt-run.png', {
      frameWidth: 80,
      frameHeight: 48,
    });

    // enemy1
    this.load.spritesheet('bot', '/assets/bot/reaperbot-sheet-alpha.png', {
      frameWidth: 42,
      frameHeight: 44,
    });
  }

  createLisaAnims() {
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
  }

  createEnemyAnims() {
    this.anims.create({
      key: 'enemy-idle',
      frames: this.anims.generateFrameNumbers('bot', { start: 20, end: 23 }),
      frameRate: 12,
      repeat: -1,
    });
  }

  create() {
    this.createLisaAnims();
    this.createEnemyAnims();

    this.scene.start('MainMenu');
  }
}
