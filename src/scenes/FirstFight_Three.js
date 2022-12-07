import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FirstFight_Three extends Scene {
  cameras;
  player;
  platforms;
  waterFallPlatform;

  constructor(data) {
    super({ key: 'FirstFight_Three' });
  }

  create(data) {
    // Background - First Scene(3)
    this.stars = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.map = this.make.tilemap({ key: 'tilemap_FF3' });

    this.groundTileset = this.map.addTilesetImage('ground_tileset', 'tiles');

    this.mechanicalTileset = this.map.addTilesetImage(
      'mechanical_tileset',
      'mechanical'
    );

    this.groundAndPlatforms = this.map.createLayer(
      'ground_layer',
      this.groundTileset,
      0,
      0
    );

    this.mechanicalLayer = this.map.createLayer(
      'mechanical_layer',
      this.mechanicalTileset,
      0,
      0
    );

    this.player = new Lisa(this, x, y, data.hp, data.score);
    this.physics.add.collider(this.player, this.groundAndPlatforms);
    this.groundAndPlatforms.setCollisionBetween(142, 170);
    this.groundAndPlatforms.displayWidth = this.sys.canvas.width;
    this.groundAndPlatforms.displayHeight = this.sys.canvas.height;
    // this.groundAndPlatforms.setCollisionBetween(720, 746);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 120, this.sys.canvas.height, 'test2')
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.start('Form', {
        hp: this.player.hp,
        score: this.player.score,
        timer: this.timer,
      });
    });
    waterFallPlatform.setVisible(false);
  }

  update() {
    this.player.update();
  }
}

export default FirstFight_Three;
