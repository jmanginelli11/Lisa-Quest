import { Scene } from 'phaser';

class Intro extends Scene {
  constructor() {
    super({ key: 'Intro' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(x, y, 'stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.story = this.add.text(x - 400, y - 200, '');

    this.typewriteText(
      "                \nEarth is dying. \n                \nEvil capitalists have selfishly mined our world to the edge of destruction.\n                \nA small, peacefull contingent of humans have put their hopes in you, Lisa.\n                \nYour mission is the find a habitable new planet where humans can live \npeacefully, in balace with nature.\n                \nThis planet looks promising!\n                \nBut wait, what's that?\n                \nOh no! The capitalists are here to destroy this planet too!\n                \nWe can't have that! "
    );

    let gameButton = this.add
      .image(x + 200, y + 200, 'letsGo-white')
      .setScale(5);

    gameButton.setInteractive();

    gameButton.on('pointerover', () => {
      gameButton = this.add.image(x + 200, y + 200, 'letsGo-blue').setScale(5);
    });
    gameButton.on('pointerout', () => {
      gameButton = this.add.image(x + 200, y + 200, 'letsGo-white').setScale(5);
    });

    gameButton.on('pointerup', () => {
      this.scene.switch('GameScene');
    });
  }
  typewriteText(text) {
    const length = text.length;
    let i = 0;
    this.time.addEvent({
      callback: () => {
        this.story.text += text[i];
        i++;
      },
      repeat: length - 1,
      delay: 50,
    });
  }
}

export default Intro;
