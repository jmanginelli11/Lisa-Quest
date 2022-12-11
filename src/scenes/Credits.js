import { Scene } from 'phaser';
import WebFontFile from '../helpers/fontLoader';

class Credits extends Scene {
  constructor(data) {
    super({ key: 'Credits' });
  }

  preload() {
    this.load.addFile(new WebFontFile(this.load, 'Press Start 2P'));
  }

  create(data) {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.add.image(x, y, 'shiny_stars');

    //Naomi
    this.naomi = this.add
      .image(x + x / 4, y / 2, 'naomi')
      .setScale(innerWidth / 200);

    this.naomiBubble = this.add
      .image(
        this.naomi.x + this.naomi.x / 4,
        this.naomi.y - this.naomi.y / 2.5,
        'bubble'
      )
      .setScale(x / 125)
      .setInteractive();

    this.naomiName = this.add
      .text(
        this.naomiBubble.x - this.naomiBubble.x / 50,
        this.naomiBubble.y,
        'Naomi \nBrender',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '10px',
          color: 'black',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setScale(this.naomiBubble.scale / 3);

    //Jackie
    this.jackie = this.add
      .image(x - x / 1.75, y / 2, 'jags')
      .setScale(innerWidth / 200);

    this.jackieBubble = this.add
      .image(
        this.jackie.x + this.jackie.x / 1.3,
        this.jackie.y - this.jackie.y / 2.5,
        'bubble'
      )
      .setScale(x / 125)
      .setInteractive();

    this.jackieName = this.add
      .text(
        this.jackieBubble.x - this.jackieBubble.x / 10,
        this.jackieBubble.y,
        'Jackie \nManginelli',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '10px',
          color: 'black',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setScale(this.jackieBubble.scale / 3);

    //Lauren
    this.lauren = this.add
      .image(x + x / 4, y + y / 3, 'lauren')
      .setScale(innerWidth / 200);

    this.laurenBubble = this.add
      .image(
        this.lauren.x + this.lauren.x / 4,
        this.lauren.y - this.lauren.y / 8,
        'bubble'
      )
      .setScale(x / 125)
      .setInteractive();

    this.laurenName = this.add
      .text(
        this.laurenBubble.x - this.laurenBubble.x / 50,
        this.laurenBubble.y,
        'Lauren \nBaca',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '10px',
          color: 'black',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setScale(this.laurenBubble.scale / 3);

    //Sheyla
    this.sheyla = this.add
      .image(x - x / 1.75, y + y / 3, 'sheyla')
      .setScale(innerWidth / 200);

    this.sheylaBubble = this.add
      .image(
        this.sheyla.x + this.sheyla.x / 1.3,
        this.sheyla.y - this.sheyla.y / 8,
        'bubble'
      )
      .setScale(x / 125)
      .setInteractive();

    this.sheylaName = this.add
      .text(
        this.sheylaBubble.x - this.sheylaBubble.x / 6,
        this.sheylaBubble.y,
        'Sheyla \nDe los Santos',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '10px',
          color: 'black',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setScale(this.sheylaBubble.scale / 3);

    //External Links
    this.naomiBubble.on(
      'pointerup',
      () => {
        window.open('https://www.linkedin.com/in/naomibrender/');
      },
      this
    );

    this.jackieBubble.on(
      'pointerup',
      () => {
        window.open('https://www.linkedin.com/in/jackie-manginelli/');
      },
      this
    );

    this.laurenBubble.on(
      'pointerup',
      () => {
        window.open('https://www.linkedin.com/in/laurenmhbaca/');
      },
      this
    );

    this.sheylaBubble.on(
      'pointerup',
      () => {
        window.open('https://www.linkedin.com/in/sheyladelossantos/');
      },
      this
    );

    //Main menu
    let mainMenuButton = this.add
      .image(x / 5, y * 1.85, 'main-menu')
      .setScale(x * 0.0015);
    mainMenuButton.setInteractive();
    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu', {
        music: data.music,
      });
    });
  }
}

export default Credits;
