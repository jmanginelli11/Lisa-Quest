import { Scene } from 'phaser';

class HighScores extends Scene {
  constructor() {
    super({ key: 'HighScores' });
  }

  preload() {
    this.load.image('sky', '/assets/menu/sky.png');
  }

  create() {
    this.background = this.add.image(400, 300, 'sky');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;
  }
}

export default HighScores;
