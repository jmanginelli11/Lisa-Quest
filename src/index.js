import * as Phaser from 'phaser';
import MainMenu from './scenes/MainMenu.js';
import GameScene from './scenes/GameScene';
import GameScore from './scenes/GameScore';
import HighScores from './scenes/HighScores';
import Credits from './scenes/Credits';
import GameOver from './scenes/GameOver.js';
import Preloader from './scenes/Preloader.js';
import GameSceneTester from './helpers/HealthBarSprite.js';
import Intro from './scenes/Intro';
import FallingScene_One from './scenes/FallingScene_One.js';
import FallingScene_Two from './scenes/FallingScene_Two.js';
import FirstFight_Start from './scenes/FirstFight_Start.js';
import FirstFight_Two from './scenes/FirstFight_Two';
import FirstFight_Three from './scenes/FirstFight_Three.js';
import PromisedLandFirst from './scenes/PromisedLandFirst.js';
import BossFight from './scenes/BossFight.js';

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
    Intro,
    GameScene,
    GameScore,
    HighScores,
    Credits,
    GameOver,
    GameSceneTester,
    FallingScene_One,
    FallingScene_Two,
    FirstFight_Start,
    FirstFight_Two,
    FirstFight_Three,
    PromisedLandFirst,
    BossFight,
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
