import { Scene } from 'phaser';

export function loadSpritesheets() {
  this.load.spritesheet('idle', '/assets/lisa/default/lisa-idle');
  this.load.spritesheet('jump', '/assets/lisa/default/lisa-jump');
  this.load.spritesheet('fall', '/assets/lisa/default/lisa-fall');
  this.load.spritesheet('dash', '/assets/lisa/default/lisa-dash');
  this.load.spritesheet('run', '/assets/lisa/default/lisa-run');
}

export let lisaSprite = this.physics.add.sprite(100, 450, 'idle');

export function loadAnims() {
  this.anims.create({
    key: 'dash',
    frames: this.anims.generateFrameNumbers('dash', { start: 0, end: 6 }),
    frameRate: 12,
  });
  this.anims.create({
    key: 'run',
    frames: this.anims.generateFrameNumbers('run', { start: 0, end: 8 }),
    frameRate: 12,
    repeat: -1,
    delay: 600,
  });
}
