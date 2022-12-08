import { Scene } from 'phaser';
import store from '../store';

class HighScores extends Scene {
  constructor(data) {
    super({ key: 'HighScores' });

    this.scores = [];
  }

  create(data) {
    //Defining x and y
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Getting score from state
    this.scores = store.getState();

    //Adding background
    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    let mainMenuButton = this.add
      .image(x / 2 - 200, y * 1.85, 'main-menu')
      .setScale(1);
    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });

    //Bitmap font
    this.add
      .bitmapText(100, 100, 'arcade', 'RANK   SCORE   NAME')
      .setTint(0xffffff);

    for (let i = 1; i < 7; i++) {
      if (this.scores[i - 1]) {
        if (this.scores[i - 1].score > 0 && this.scores[i - 1].score < 99) {
          this.add
            .bitmapText(
              100,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}      ${
                this.scores[i - 1].name
              } \n`
            )
            .setTint(0xffffff);
        } else if (this.scores[i - 1].score < 999) {
          this.add
            .bitmapText(
              100,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}     ${
                this.scores[i - 1].name
              } \n`
            )
            .setTint(0xffffff);
        } else if (this.scores[i - 1].score > 999) {
          this.add
            .bitmapText(
              100,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}    ${
                this.scores[i - 1].name
              } \n`
            )
            .setTint(0xffffff);
        }
      }
      // } else {
      //   this.add
      //     .bitmapText(100, 171 + 60 * i, 'arcade', `  ${i}      0      ---  \n`)
      //     .setTint(0xffffff);
      // }
    }
  }
}

export default HighScores;
