import { Scene } from 'phaser';

class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
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
    // let formButton = this.add.image(x, y + 200, 'credits-white').setScale(4);
    // let jackieButton = this.add.image(x, y + 300, 'credits-white').setScale(4);

    // let naomiButton = this.add.text(x - 200, y, "NAOMI'S BUTTON");

    playButton.setInteractive();
    highScoreButton.setInteractive();
    creditsButton.setInteractive();
    // formButton.setInteractive();
    // jackieButton.setInteractive();
    // naomiButton.setInteractive();

    let hoverSprite1 = this.add.sprite(100, 100, 'lisa').setScale(3.5);
    hoverSprite1.setVisible(false);
    let hoverSprite2 = this.add.sprite(100, 100, 'lisa-alt').setScale(3.5);
    hoverSprite2.setVisible(false);
    hoverSprite2.flipX = true;

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('lisa', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: 'alt-run',
      frames: this.anims.generateFrameNumbers('lisa-alt', {
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
      hoverSprite2.play('alt-run');
      hoverSprite2.x = playButton.x + 170;
      hoverSprite2.y = playButton.y - 40;
    });

    playButton.on('pointerout', () => {
      playButton = this.add.image(x, 250, 'play-white').setScale(3);
      hoverSprite1.setVisible(false);
      hoverSprite2.setVisible(false);
    });

    playButton.on('pointerup', () => {
      // console.log('lesssss gooooooooooo');
      this.scene.switch('Intro');
    });

    highScoreButton.on('pointerover', () => {
      playButton = this.add.image(x, y + 50, 'high-score-red').setScale(1.8);
    });

    highScoreButton.on('pointerup', () => {
      this.scene.switch('OneFallingScene');
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
      this.scene.switch('Credits');
    });

    // formButton.on('pointerover', () => {
    //   formButton = this.add.image(x, y + 200, 'credits-red').setScale(4);
    // });
    // formButton.on('pointerout', () => {
    //   formButton = this.add.image(x, y + 200, 'credits-white').setScale(4);
    // });
    // formButton.on('pointerup', () => {
    //   this.scene.switch('FirstFight_Start');
    // });

    // jackieButton.on('pointerover', () => {
    //   jackieButton = this.add.image(x, y + 300, 'credits-red').setScale(4);
    // });
    // jackieButton.on('pointerout', () => {
    //   jackieButton = this.add.image(x, y + 300, 'credits-white').setScale(4);
    // });
    // jackieButton.on('pointerup', () => {
    //   this.scene.switch('Jackie');
    // });

    // naomiButton.on('pointerout', () => {
    //   console.log('clicked on Naomi button');
    // });
    // naomiButton.on('pointerup', () => {
    //   this.scene.switch('PromisedLandFirst');
    // });
  }
}

export default MainMenu;
