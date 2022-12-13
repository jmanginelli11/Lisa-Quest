import Phaser from 'phaser';
import { Sprite } from 'phaser';

export class EnemiesParent extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, spriteSheet) {
    super(scene, x, y, spriteSheet);

    this.init();

    if (this.scene.enemiesArray) this.scene.enemiesArray.push(this);
    else
      throw 'You must add an enemiesArray to this scene in order for Lisa to interact with them.';
  }

  init() {
    this.is_enemy = true;
  }

  hitByPlayer(enemy) {
    enemy.hp = Phaser.Math.Clamp(enemy.hp - 1, 0, 20);
  }
}
