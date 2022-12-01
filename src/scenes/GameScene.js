import { Scene, physics } from 'phaser';
import { Lisa } from './Lisa';

class GameScene extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'shiny_stars');
    this.add.image(x, y, 'planet_surface');
    this.add.image(x, y, 'planet_vegetation');

    let mainMenuButton = this.add
      .image(x / 2, y * 1.8, 'main-menu')
      .setScale(3);
    mainMenuButton.setInteractive();

    mainMenuButton.on('pointerup', () => {
      this.scene.switch('MainMenu');
    });

    let timeTextStyle = {
      font: '24px Roboto',
      fill: '#E43AA4',
      stroke: '#000',
      strokeThickness: 4,
    };
    this.timer = this.add.text(16, 16, 'Time: ', timeTextStyle);

    // Creating Player (Lisa)
    this.player = new Lisa(this, x, y);

    // Test platform (needed for char testing)

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(x, innerHeight - 200, 'ground')
      .setScale(4)
      .refreshBody();
    this.physics.add.collider(this.player, this.platforms);


    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);
  }

  update(time) {
    // Update Player
    this.player.update();

    // Do enemy AI
    this.enemy.anims.play('enemy-idle');
    this.enemyFollows();

    // Timer
    let gameRunTime = time * 0.001;
    this.timer.setText('Time: ' + Math.round(gameRunTime) + ' seconds ');
  }

  // Following Enemy AI
  enemyFollows() {
    this.physics.moveToObject(this.enemy, this.player, 100);
  }
}

export default GameScene;
