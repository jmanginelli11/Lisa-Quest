import { Scene } from 'phaser';

class Intro extends Scene {
  constructor(data) {
    super('Intro');
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Background
    this.background = this.add.image(x, y, 'shiny_stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    //Text
    this.story = this.add.text(x - x / 2, y - y / 1.2, '').setScale(x * 0.002);

    this.typewriteText(
      "                \nEarth is dying. \n                \nEvil capitalists have selfishly mined our \nworld to the edge of destruction.\n                \nA small, peaceful contingent of humans \nhave put their hopes in you, Lisa.\n                \nYour mission is to find a habitable \nnew planet where humans can live \npeacefully, in balace with nature.\n                \nThis planet looks promising!\n                \nBut wait, what's that?\n                \nOh no! The capitalists are here \nto destroy this planet too!\n                \nWe can't have that! "
    );

    //Let's go button
    let gameButton = this.add
      .image(x + 200, y * 1.85, 'letsGo-white')
      .setScale(x * 0.0018);

    gameButton.setInteractive();

    gameButton.on('pointerover', () => {
      gameButton = this.add
        .image(x + 200, y * 1.85, 'letsGo-red')
        .setScale(x * 0.0018);
    });
    gameButton.on('pointerout', () => {
      gameButton = this.add
        .image(x + 200, y * 1.85, 'letsGo-white')
        .setScale(x * 0.0018);
    });

    gameButton.on('pointerup', () => {
      this.scene.start('GameScene', {
        music: data.music,
      });
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
      delay: 30,
    });
  }
}

export default Intro;
