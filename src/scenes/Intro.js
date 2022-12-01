import { Scene } from 'phaser';

class Intro extends Scene {
  constructor() {
    super({ key: 'Intro' });
    // const story = "here is our intro story oOoOoOoOoOoOoOo"
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    // space = this.add.tileSprite(x, y, 800, 600, 'stars');

    this.add.image(x, y, 'stars');

    this.text = this.add.text(x, y, 'here is our intro story oOoOoOoOoOoOoOo');

    this.tweens.add({
      targets: this.text,
      scroll: true,
      loop: -1,
    });
    // this.wordsOnScreen = this.add.text(x, y, '');

    // this.typewriteText(
    //   "I'm the Intro Scene! I'm the Intro Scene! I'm the Intro Scene! I'm the Intro Scene! I'm the Intro Scene!"
    // );
  }

  // typewriteText(text) {
  //   const length = text.length;
  //   let i = 0;
  //   this.time.addEvent({
  //     callback: () => {
  //       this.wordsOnScreen.text += text[i];
  //       i++;
  //     },
  //     repeat: length - 1,
  //     delay: 2000,
  //   });
  // }
  // update() {
  //   space.tilePosition.y += 2;
  // }
}

export default Intro;
