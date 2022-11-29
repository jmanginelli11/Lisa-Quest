import { Scene } from 'phaser';
import { loadAnims, lisaSprite, loadSpritesheets } from './Lisa';

class GameScene extends Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('sky', '/assets/menu/sky.png');
    this.load.image('main-menu', '/assets/menu/mainMenu_white.png');
    loadSpritesheets();
  }

  create() {
    this.add.image(400, 300, 'sky');

    let mainMenuButton = this.add.image(125, 575, 'main-menu').setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
    });

    player = lisaSprite;
    player.setCollideWorldBounds(true);
    loadAnims();

    // Test platforms for testing
    platforms = this.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  }

  update() {
    // Idling and basic movement
    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('dash', true);
      player.anims.play('run', true);
      player.flipX = true;
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('dash', true);
      player.anims.play('run', true);
      player.flipX = false;
    } else {
      player.setVelocityX(0);

      player.anims.play('idle');
    }
  }
}

export default GameScene;
