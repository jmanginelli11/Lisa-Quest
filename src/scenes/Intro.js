import { Scene } from 'phaser';

class Intro extends Scene {
  constructor() {
    super({ key: 'Intro' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    space = this.add.tileSprite(x, y, 800, 600, 'stars');

    // this.add.image(x, y, 'stars');

    wordsOnScreen = this.add.text(x, y, "I'm the Intro Scene!");
    wordsOnScreen.setScrollFactorY(0, 1);
  }
  update() {
    space.tilePosition.y += 2;
  }
}

export default Intro;
