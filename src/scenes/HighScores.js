import { Scene } from 'phaser';
import store from '../store';
import { fetchScores } from '../store/redux/scoresReducer';

class HighScores extends Scene {
  constructor(data) {
    super('HighScores');

    this.scores = [];
  }

  async create(data) {
    // Defining x and y
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    //Refresh the state
    await store.dispatch(fetchScores());

    //Getting score from state
    this.scores = store.getState();

    //Background
    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    //Bitmap text
    this.add
      .bitmapText(x / 5, 100, 'arcade', 'RANK   SCORE   NAME')
      .setTint(0xffffff)
      .setScale(x / 700);

    for (let i = 1; i < 7; i++) {
      if (this.scores[i - 1].score > 0) {
        if (this.scores[i - 1].score > 0 && this.scores[i - 1].score < 99) {
          this.add
            .bitmapText(
              x / 5,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}      ${
                this.scores[i - 1].name
              } \n`
            )
            .setScale(x / 700)
            .setTint(0xffffff);
        } else if (this.scores[i - 1].score < 999) {
          this.add
            .bitmapText(
              x / 5,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}     ${
                this.scores[i - 1].name
              } \n`
            )
            .setScale(x / 700)
            .setTint(0xffffff);
        } else if (this.scores[i - 1].score > 999) {
          this.add
            .bitmapText(
              x / 5,
              170 + 60 * i,
              'arcade',
              `\n  ${i}    ${this.scores[i - 1].score}    ${
                this.scores[i - 1].name
              } \n`
            )
            .setScale(x / 700)
            .setTint(0xffffff);
        }
      }
    }

    //Main menu button
    let mainMenuButton = this.add
      .image(x / 5, y * 1.85, 'main-menu')
      .setScale(x * 0.0015)
      .setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu', {
        music: data.music,
      });
    });
  }
}

export default HighScores;
