import { Scene } from 'phaser';

class Intro extends Scene {
  constructor() {
    super({ key: 'Intro' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.add.image(x, y, 'stars');

    this.story = this.add.text(x - 400, y - 200, '');

    this.typewriteText(
      "                Earth is dying. \n                \nEvil capitalist have selfishly mined our world to the edge of destruction.\n                \nA small, peacefull contingent of humans have put their hopes in you, Lisa.\n                \nYou're mission is the find a habitable new planet where humans can live \npeacefully, in balace with nature.\n                \nThis planet looks promising!\n                \nBut wait, what's that?\n                \nOh no! The capitalists are here to destroy this planet too!\n                \nWe can't have that! "
    );
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
