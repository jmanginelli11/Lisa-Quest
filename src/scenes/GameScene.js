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
    this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

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
    this.player = new Lisa(this, 0, 0).setOrigin(0, 0);

    //Background - First Scene
    this.map = this.make.tilemap({ key: 'tilemap' });
    this.surfaceTileset = this.map.addTilesetImage('surface', 'tiles');
    this.vegetationOneTileset = this.map.addTilesetImage(
      'vegetation',
      'vegetation1'
    );

    this.vegetationTwoTileset = this.map.addTilesetImage(
      'vegetation_color',
      'vegetation2'
    );

    this.groundLayer = this.map.createLayer(
      'ground',
      this.surfaceTileset,
      0,
      0
    );
    this.vegetationLayerOne = this.map.createLayer(
      'vegetation',
      this.vegetationOneTileset,
      0,
      0
    );
    this.vegetationLayerTwo = this.map.createLayer(
      'vegetation_color',
      this.vegetationTwoTileset,
      0,
      0
    );

    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(72, 99);

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
