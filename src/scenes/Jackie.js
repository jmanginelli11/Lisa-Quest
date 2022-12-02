import { Scene, physics } from "phaser";
import { Enemy } from "./Enemy";
// import { loadAnims, lisaSprite, loadSpritesheets } from './Lisa';

class Jackie extends Scene {
  enemy;
  platforms;
  // set direction in this so that you can change it back and forth
  direction = "right";

  constructor() {
    super({ key: "Jackie" });
  }

  create() {
    const x = innerWidth / 2;
    const y = innerHeight / 2;
    this.add.image(x, y, "stars");

    // creating the enemy sprite

    this.enemy = new Enemy(this, x, y).setScale(2);

    // Test platform (needed for char testing)
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, "ground").setScale(4).refreshBody();
    this.physics.add.collider(this.enemy, this.platforms);

    //   this.anims.create({
    //     key: "grenadeRun",
    //     frames: this.anims.generateFrameNumbers("grenadeGuy", {
    //       start: 8,
    //       end: 20,
    //     }),
    //     frameRate: 12,
    //     repeat: -1,
    //   });
    // }
  }

  update() {
    // Enemy "goomba" moves back and forth when it hits a wall it changes direction
    //   if (this.enemy.body.blocked.right) {
    //     this.direction = "left";
    //   }
    //   if (this.enemy.body.blocked.left) {
    //     this.direction = "right";
    //   }
    //   if (this.direction === "left") {
    //     this.enemy.anims.play("grenadeRun");
    //     this.enemy.setVelocityX(-200);
    //   }
    //   if (this.direction === "right") {
    //     this.enemy.anims.play("grenadeRun");
    //     this.enemy.setVelocityX(200);
    //   }
    // }
    this.enemy.update();
  }
}

export default Jackie;
