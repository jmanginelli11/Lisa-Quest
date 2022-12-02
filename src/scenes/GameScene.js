import { Scene, physics } from 'phaser';
import { Lisa } from './Lisa';

class GameScene extends Scene {
  player;
  enemy;
  platforms;
  cursors;
  timer;
  map;
  groundLayer;
  surfaceTileset;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, 'shiny_stars');
    this.add.image(x, y, 'surface');

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

    //Background - First Scene
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.surfaceTileset = this.map.addTilesetImage('surface', 'surface');
    this.groundLayer = this.map.createLayer('ground', this.surfaceTileset);
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(72, 74);

    // // Test platform (needed for char testing)
    // this.platforms = this.physics.add.staticGroup();
    // this.platforms
    //   .create(x, innerHeight - 170, 'test')
    //   .setScale(5)
    //   .refreshBody();
    // this.physics.add.collider(this.player, this.platforms);
    // this.platforms.setVisible(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // creating the enemy sprite

    this.enemy = this.physics.add.sprite(x, y, 'bot').setScale(2);
    this.enemy.setCollideWorldBounds(true);

    // Collider so enemy and player can interact
    this.physics.add.collider(this.player, this.enemy);
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
