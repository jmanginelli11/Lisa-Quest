import { Scene } from 'phaser';
import store from '../store';
import { fetchScores } from '../store/redux/scoresReducer';

class MainMenu extends Scene {
  music;

  constructor(data) {
    super({ key: 'MainMenu' });
  }

  create(data) {
    store.dispatch(fetchScores());

    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.background = this.add.image(x, y, 'shiny_stars');
    this.background.displayWidth = this.sys.canvas.width;
    this.background.displayHeight = this.sys.canvas.height;

    let playButton = this.add.image(x, 250, 'play-white').setScale(3);
    let highScoreButton = this.add
      .image(x, y + 50, 'high-score-white')
      .setScale(1.8);

    let creditsButton = this.add
      .image(x, y + 250, 'credits-white')
      .setScale(1.8);

    playButton.setInteractive();
    highScoreButton.setInteractive();
    creditsButton.setInteractive();

    let hoverSprite1 = this.add.sprite(100, 100, 'lisa').setScale(3.5);
    hoverSprite1.setVisible(false);
    let hoverSprite2 = this.add.sprite(100, 100, 'tori').setScale(3.5);
    hoverSprite2.setVisible(false);
    hoverSprite2.flipX = true;

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('lisa', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'tori-run',
      frames: this.anims.generateFrameNumbers('tori', {
        start: 0,
        end: 7,
      }),
      frameRate: 12,
      repeat: -1,
    });

    playButton.on('pointerover', () => {
      playButton = this.add.image(x, 250, 'play-red').setScale(3);

      hoverSprite1.setVisible(true);
      hoverSprite1.play('run');
      hoverSprite1.x = playButton.x - 170;
      hoverSprite1.y = playButton.y - 25;

      hoverSprite2.setVisible(true);
      hoverSprite2.play('tori-run');
      hoverSprite2.x = playButton.x + 170;
      hoverSprite2.y = playButton.y - 40;
    });

    playButton.on('pointerout', () => {
      playButton = this.add.image(x, 250, 'play-white').setScale(3);
      hoverSprite1.setVisible(false);
      hoverSprite2.setVisible(false);
    });

    playButton.on('pointerup', () => {
      this.scene.start('Intro', {
        music: data.music,
      });
    });

    highScoreButton.on('pointerover', () => {
      playButton = this.add.image(x, y + 50, 'high-score-red').setScale(1.8);
    });

    highScoreButton.on('pointerup', () => {
      this.scene.start('HighScores', {
        music: data.music,
      });
    });

    highScoreButton.on('pointerout', () => {
      playButton = this.add.image(x, y + 50, 'high-score-white').setScale(1.8);
    });

    creditsButton.on('pointerover', () => {
      creditsButton = this.add.image(x, y + 250, 'credits-red').setScale(1.8);
    });

    creditsButton.on('pointerout', () => {
      creditsButton = this.add.image(x, y + 250, 'credits-white').setScale(1.8);
    });

    creditsButton.on('pointerup', () => {
      this.scene.start('Credits', {
        music: data.music,
      });
    });
  }
}

export default MainMenu;
