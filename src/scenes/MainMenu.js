import { Scene } from 'phaser';

class MainMenu extends Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'stars');

    let playButton = this.add.image(x, y, 'play-white').setScale(5);
    let creditsButton = this.add.image(x, y + 100, 'credits-white').setScale(3);
    // let formButton = this.add.image(x, y + 100, 'credits-white').setScale(3);

    playButton.setInteractive();
    creditsButton.setInteractive();
    // formButton.setInteractive();

    let hoverSprite = this.add.sprite(100, 100, 'lisa').setScale(3.5);
    hoverSprite.setVisible(false);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('lisa', { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
      // delay: 500,
    });

    playButton.on('pointerover', () => {
      playButton = this.add.image(x, y, 'play-red').setScale(5);
      hoverSprite.setVisible(true);
      hoverSprite.play('run');
      hoverSprite.x = playButton.x - 150;
      hoverSprite.y = playButton.y - 75;
    });

    playButton.on('pointerout', () => {
      playButton = this.add.image(x, y, 'play-white').setScale(5);
      hoverSprite.setVisible(false);
    });

    playButton.on('pointerup', () => {
      console.log('lesssss gooooooooooo');
      this.scene.switch('GameScene');
    });

    creditsButton.on('pointerover', () => {
      creditsButton = this.add.image(x, y + 100, 'credits-red').setScale(3);
    });

    creditsButton.on('pointerout', () => {
      creditsButton = this.add.image(x, y + 100, 'credits-white').setScale(3);
    });
    creditsButton.on('pointerup', () => {
      this.scene.switch('Credits');
    });

    // formButton.on('pointerover', () => {
    //   formButton = this.add.image(x, y + 200, 'credits-red').setScale(3);
    // });

    // formButton.on('pointerout', () => {
    //   formButton = this.add.image(x, y + 200, 'credits-white').setScale(3);
    // });
    // formButton.on('pointerup', () => {
    //   this.scene.switch('Form');
    // });
  }
}

export default MainMenu;
