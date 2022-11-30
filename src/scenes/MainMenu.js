import { Scene } from 'phaser';

class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'stars');

    let playButton = this.add.image(x, y, 'play-white').setScale(5);
    let creditsButton = this.add.image(x, y + 100, 'credits-white').setScale(3);

    playButton.setInteractive();
    creditsButton.setInteractive();

    playButton.on('pointerover', () => {
      playButton = this.add.image(x, y, 'play-red').setScale(5);
    });

    playButton.on('pointerout', () => {
      playButton = this.add.image(x, y, 'play-white').setScale(5);
    });

    playButton.on('pointerup', () => {
      console.log('lesssss gooooooooooo');
      this.scene.switch('GameScene');
    });

    creditsButton.on('pointerover', () => {
      creditsButton = this.add.image(x, y + 100, 'credits-red').setScale(3);
    });

    creditsButton.on('pointerout', () => {
      creditsButton = this.add.image(x, y + 100, 'credits-white').setScale(3);
    });

    creditsButton.on('pointerup', () => {
      this.scene.switch('Form');
    });
  }
}

export default MainMenu;
