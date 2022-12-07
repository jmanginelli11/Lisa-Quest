import { Scene } from 'phaser';
import axios from 'axios';

class HighScores extends Scene {
  constructor() {
    super({ key: 'HighScores' });

    this.scores = [];
  }

  preload() {
    this.load.bitmapFont(
      'arcade',
      '/assets/fonts/joystix.png',
      '/assets/fonts/joystix.xml'
    );
  }

  scoreData = async () => {
    const { data } = await axios.get('/api/scores');
    return data;
  };

  create() {
    let names;
    this.scores = this.scoreData();
    console.log(this.scores);
    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    this.add
      .bitmapText(100, 100, 'arcade', 'RANK   SCORE   NAME')
      .setTint(0xffffff);
    if (this.scores) {
      for (let i = 1; i < 6; i++) {
        if (this.scores[i - 6]) {
          this.add
            .bitmapText(
              100,
              160,
              50 * i,
              'arcade',
              `${i}   ${this.scores[i - 1].score}   ${this.scores[i - 1].name}`
            )
            .setTint(0xffffff);
        } else {
          this.add
            .bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`)
            .setTint(0xffffff);
        }
      }
    }
  }
}

export default HighScores;
