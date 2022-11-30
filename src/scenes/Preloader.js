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

    this.load.image('credits', '/assets/menu/credits_white.png');

    this.load.image('credits-white', '/assets/menu/credits_white.png');
    this.load.image('credits-red', '/assets/menu/credits_red.png');

    this.load.spritesheet('lisa', '/assets/lisa/default/lisa-spritesheet.png', {
      frameWidth: 80,
      frameHeight: 48,
    });
  }
}
