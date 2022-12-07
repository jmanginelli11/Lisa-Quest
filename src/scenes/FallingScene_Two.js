import { Scene } from 'phaser';
import { Lisa } from '../sprites/Lisa.js';

class FallingScene_Two extends Scene {
  player;
  cameras;
  platforms;
  constructor(data) {
    super({ key: 'FallingScene_Two' });
  }

  create(data) {
    // Creating Player (Lisa)

    //Background - First Scene

    const x = innerWidth / 2;
    const y = innerHeight / 2;

    this.background = this.add.image(0, 0, 'shiny_stars').setOrigin(0, 0);

    this.map = this.make.tilemap({ key: 'tilemapFallingSceneTwo' });
    this.waterAndRockTileset = this.map.addTilesetImage(
      'water_and_rock',
      'tiles'
    );

    this.textureTwoTileset = this.map.addTilesetImage(
      'textures_2',
      'texturesTwo'
    );

    this.groundLayer = this.map.createLayer(
      'water_layer',
      this.waterAndRockTileset,
      0,
      0
    );

    this.texturesTwoLayer = this.map.createLayer(
      'texture_2_layer',
      this.textureTwoTileset,
      0,
      0
    );

    //player
    this.player = new Lisa(this, x + 100, 0, data.hp, data.score);

    //colliders
    this.physics.add.collider(this.player, this.groundLayer);
    this.groundLayer.setCollisionBetween(95, 99);
    this.physics.add.collider(this.player, this.texturesTwoLayer);
    this.texturesTwoLayer.setCollisionBetween(1000, 1250);

    // Invisible platform
    this.platforms = this.physics.add.staticGroup();
    let waterFallPlatform = this.platforms
      .create(this.sys.canvas.width / 2 + 120, this.sys.canvas.height, 'test')
      .refreshBody();
    this.physics.add.collider(this.player, waterFallPlatform, () => {
      this.scene.start('FirstFight_Start', {
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

export default FallingScene_Two;
