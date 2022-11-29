import * as Phaser from 'phaser';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene';
import GameScore from './scenes/GameScore';
import HighScores from './scenes/HighScores';
import Credits from './scenes/Credits';
('');
// import { MainMenu, GameScene, GameScore, HighScores, Credits } from "./scenes";

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [MainMenu, GameScene, GameScore, HighScores, Credits],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },

  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);
