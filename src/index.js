import * as Phaser from 'phaser';
import GameScene from './GameScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: GameScene,
};

const game = new Phaser.Game(config);
