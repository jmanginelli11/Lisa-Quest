import * as Phaser from 'phaser';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene';
import HighScores from './scenes/HighScores';
import Credits from './scenes/Credits';
import GameOver from './scenes/GameOver.js';
import Preloader from './scenes/Preloader.js';
import Intro from './scenes/Intro';
import First from './scenes/First';
import Second from './scenes/Second.js';
import Third from './scenes/Third.js';
import Fourth from './scenes/Fourth';
import Fifth from './scenes/Fifth.js';
import BossFight from './scenes/BossFight.js';
import Last from './scenes/Last.js';

const config = {
  type: Phaser.AUTO,
  dom: { createContainer: true },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: innerWidth,
    height: innerHeight,
  },
  scene: [
    Preloader,
    MainMenu,
    HighScores,
    Credits,
    Intro,
    GameScene,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    BossFight,
    Last,
    GameOver,
  ],
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
