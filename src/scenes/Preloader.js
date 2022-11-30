import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Preloader' });
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.scene.start('MainMenu');
    this.readyCount += 1;
    if (this.readyCount === 5) {
      this.scene.start('MainMenu');
    }
  }

  preload() {
    this.load.on('complete', () => {
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

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
    this.load.spritesheet('lisa', '/assets/lisa/default/lisa-spritesheet.png', {
      frameWidth: 80,
      frameHeight: 48,
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
}
