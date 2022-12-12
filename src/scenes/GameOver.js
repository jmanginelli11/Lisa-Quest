import store from '../store';
import { persistAddedScores } from '../store/redux/scoresReducer';
import { Scene } from 'phaser';
import WebFontFile from '../helpers/fontLoader';

class GameOver extends Scene {
  player;

  constructor(data) {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(x, y, 'shiny_stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    //Game over png
    this.gameOver = this.add.image(x, y - 150, 'gameOver').setScale(4);

    const score = data.score || 0;
    this.scoreText = this.add.text(
      innerWidth * 0.05,
      innerHeight * 0.05,
      'Score: ' + score,
      {
        fontFamily: '"Press Start 2P"',
        fontSize: '32px',
        fill: '#E43AA4',
      }
    );

    this.addScore = this.add
      .text(x, y, 'Type up to four characters\n to save your score!', {
        fontFamily: '"Press Start 2P"',
        fontSize: '20px',
        align: 'center',
      })
      .setOrigin(0, 0)
      .setPosition(x - x / 2, y + y / 6)
      .setScale(this.sys.canvas.width * 0.001);

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(1.5);
    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu');
    });

    this.form = this.add.dom(x, y + 170).createFromCache('form');

    this.form.setPerspective(300);
    this.form.addListener('change');
    this.formCounter = 0;

    this.form.on('change', (evt) => {
      this.formCounter += 1;
      if (evt.target.name === 'username') {
        if (this.formCounter === 1) {
          let username = evt.target.value;
          this.addScore
            .setText('Welcome ' + username)
            .setPosition(x - x / 4, y + y / 6);
          store.dispatch(
            persistAddedScores({ name: username, score: data.score || 0 })
          );
        }
      }
    });
  }
}

export default GameOver;
