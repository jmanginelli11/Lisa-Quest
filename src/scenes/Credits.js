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
    // this.add.image(x, y, 'creditsLOL');

    //Naomi
    this.naomi = this.add
      .image(x + x / 4, y / 2, 'naomi')
      .setScale(innerWidth / 200);
    this.naomiNubble = this.add
      .image(
        this.naomi.x + this.naomi.x / 4,
        this.naomi.y - this.naomi.y / 2.5,
        'bubble'
      )
      .setScale(x / 125);

    this.naomiName = this.add
      .text(
        this.naomiNubble.x - this.naomiNubble.x / 50,
        this.naomiNubble.y,
        'Naomi \nBrender',
        {
          fontFamily: '"Press Start 2P"',
          fontSize: '10px',
          color: 'black',
          align: 'center',
        }
      )
      .setOrigin(0, 0)
      .setScale(this.naomiNubble.scale / 3);

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
      .setScale(x / 125);

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
      .setScale(x / 125);

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
      .setScale(x / 125);
    this.sheyla.setInteractive();

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

    // console.log(this.sheylaName.y);

    let mainMenuButton = this.add
      .image(x - x / 1.25, y * 1.8, 'main-menu')
      .setScale(x * 0.002);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.start('MainMenu', {
        music: data.music,
      });
    });
  }
}

export default Credits;
