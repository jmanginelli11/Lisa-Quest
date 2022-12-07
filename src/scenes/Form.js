import axios from 'axios';
import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class Form extends Scene {
  player;

  constructor() {
    super({ key: 'Form' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.background = this.add.image(x, y, 'shiny_stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y).setVisible(false);

    this.story = this.add.text(x - 400, y - 200, '', {
      color: 'white',
      // fontFamily: 'Arial',
      fontSize: '32px',
    });

    this.typewriteText('                \nGame over...');

    const text = this.add.text(x - x / 4, y - y / 4, 'TYPE FOUR LETTERS', {
      color: 'white',
      // fontFamily: 'Arial',
      fontSize: '32px',
    });

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(1.5);
    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
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
          score: this.player.score,
        });
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

export default Form;
