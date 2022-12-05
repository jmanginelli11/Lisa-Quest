import Phaser from 'phaser';
import { Sprite } from 'phaser';

export class EnemiesParent extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteSheet) {
    super(scene, x, y, spriteSheet);
    this.init();
  }

  init() {
    this.is_enemy = true;
  }
}
