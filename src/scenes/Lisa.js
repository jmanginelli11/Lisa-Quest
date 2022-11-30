import { Sprite } from 'phaser';

class Lisa extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setPosition(x, y);
    this.aura = this.scene.add.sprite(this.body.x, this.body.y, 'hp_block');

    this.setTexture('idle0');
    this.play('idle');

    this.body // player Config
      .setBounce(0.5);
    this.body.setSize(200, 300, true);
    this.body.setGravityY(100);
    this.body.setCollideWorldBounds(true);
    this.body.setOffset(80, 87);

    //Method calls for creation
    this.init();
    this.create();
  }

  init() {
    // this.width = this.scene.sys.game.canvas.width;
    // this.height = this.scene.sys.game.canvas.height;

    //Variables
    this.is_run = false;
    this.is_idle = false;
  }

  create() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // Look in this function, after one animation is completed
    this.on('animationcomplete', (event) => {
      try {
        if (
          event.key == 'punchright' ||
          event.key == 'punchleft' ||
          event.key == 'uppercut' ||
          event.key == 'hurt'
        ) {
          this.anims.play('idle', true);
          this.colliderPunch.destroy(true);
        }
      } catch (e) {}

      this.is_blocking = false;
    });

    // key objects
    this.keyobj_j = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.J
    );

    this.keyobj_k = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.K
    );

    this.keyobj_l = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L
    );

    this.keyobj_h = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.H
    );

    this.keyobj_o = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.O
    );
  }
}
