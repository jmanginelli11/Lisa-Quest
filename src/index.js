import * as Phaser from "phaser";
import mainMenu from "./mainMenu.js";
import GameScene from "./GameScene";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [mainMenu, GameScene],

  render: {
    pixelArt: true,
  },
};

const game = new Phaser.Game(config);
