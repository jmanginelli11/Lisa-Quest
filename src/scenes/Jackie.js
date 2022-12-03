import { Scene, physics } from 'phaser';
import { Enemy } from './Enemy';
import { Lisa } from './Lisa';

class Jackie extends Scene {
  enemy;
  platforms;
  // set direction in this so that you can change it back and forth
  direction = 'right';

  constructor() {
    super({ key: 'Jackie' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;

    // Creating the enemy sprite
    this.enemy = new Enemy(this, x, y).setScale(2);
    this.player = new Lisa(this, x, y);

    // Test platform (needed for char testing)
    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(x, innerHeight - 170, 'test')
      .setScale(5)
      .refreshBody();
    this.platforms.create(x / 2, innerHeight - 450, 'test');

    // Colliders
    this.physics.add.collider(this.enemy, this.platforms);
    this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    this.enemy.update();
    this.player.update();

    if (this.enemy.hp <= 0) {
      this.enemy.destroy();
    }
  }
}

export default Jackie;
