import * as Phaser from 'phaser';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene';
import GameScore from './scenes/GameScore';
import HighScores from './scenes/HighScores';
import Credits from './scenes/Credits';
import Form from './scenes/Form.js';
import Preloader from './scenes/Preloader.js';
import HealthBar from './scenes/HealthBar';
// import { MainMenu, GameScene, GameScore, HighScores, Credits } from "./scenes";

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  dom: { createContainer: true },
  width: innerWidth,
  height: innerHeight,
  scene: [
    Preloader,
    MainMenu,
    GameScene,
    GameScore,
    HighScores,
    Credits,
    Form,
    HealthBar,
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },

  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);
