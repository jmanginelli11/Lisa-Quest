import { Scene } from 'phaser';

class GameScene extends Scene {
  preload() {
    this.load.image('logo', 'src/assets/logo.png');
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
  }
}

export default GameScene;
