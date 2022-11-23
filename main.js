import Phaser from 'phaser';
import Game from 'scenes/game.js';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Game,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
      debug: true,
    },
  },
});
