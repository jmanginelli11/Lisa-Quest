import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  //   init() {
  //     this.readyCount = 0;
  //   }

  //   ready() {
  //     this.scene.start('Title');
  //     this.readyCount += 1;
  //     if (this.readyCount === 5) {
  //       this.scene.start('Title');
  //     }
  //   }

  preload() {
    // const loadingText = this.make.text({
    //   x: width / 2,
    //   y: height / 2 - 50,
    //   text: 'Loading...',
    //   style: {
    //     font: '20px monospace',
    //     fill: '#ffffff',
    //   },
    // });
    // loadingText.setOrigin(0.5, 0.5);

    // this.load.on('complete', () => {
    //   loadingText.destroy();
    //   this.ready();
    // });

    this.load.image('sky', '/assets/menu/sky.png');
    this.load.image('main-menu', '/assets/menu/mainMenu_white.png');
    this.load.image('ground', 'assets/platform.png');

    this.load.spritesheet('lisa', '/assets/lisa/default/lisa-spritesheet.png', {
      frameWidth: 80,
      frameHeight: 48,
    });
  }
}
