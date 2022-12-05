import { Scene } from 'phaser';

class GameScore extends Scene {
  constructor() {
    super({ key: 'GameScore' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.add.image(x, y, 'stars');

    this.story = this.add.text(x - 400, y - 200, '');

    this.typewriteText('                \nGame over...');
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

export default GameScore;
