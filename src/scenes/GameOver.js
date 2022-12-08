import axios from 'axios';
import store from '../store';
import { fetchScores } from '../store/redux/scoresReducer';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class GameOver extends Scene {
  player;

  constructor(data) {
    super({ key: 'GameOver' });
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(x, y, 'shiny_stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    // Creating Player (Lisa)
    // this.player = new Lisa(this, x, y, data.score).setVisible(false);
    const score = data.score || 0;
    this.scoreText = this.add.text(
      innerWidth * 0.05,
      innerHeight * 0.05,
      'Score: ' + score,
      {
        fontSize: '32px',
        fill: '#E43AA4',
      }
    );

    this.story = this.add.text(x - 400, y - 200, '', {
      color: 'white',
      // fontFamily: 'Arial',
      fontSize: '32px',
    });

    this.typewriteText(
      '                \nGAME OVER  \nType up to four letters to save your score!'
    );

    // const text = this.add.text(
    //   x - x / 4,
    //   y - y / 4,
    //   'Type up to four letters to save your score',
    //   {
    //     color: 'white',
    //     fontFamily: 'Arial',
    //     fontSize: '32px',
    //   }
    // );

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(1.5);
    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu', {
        music: data.music,
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });

    const element = this.add.dom(x, y).createFromCache('form');

    element.setPerspective(300);
    element.addListener('change');

    element.on('change', async (evt) => {
      if (evt.target.name === 'username') {
        let username = evt.target.value;
        text.setText('Welcome ' + username);
        await axios.post('/api/scores', {
          name: username,
          score: data.score,
        });
        store.dispatch(fetchScores());
      }
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
      delay: 50,
    });
  }
}

export default GameOver;
