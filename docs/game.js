import Player from "./player.js";
import Enemy from "./enemy.js";
import Wall from "./wall.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('character', 'favicon.png');
    this.load.image('wall', 'player.png');
  }

  create() {
    this.player = new Player(this, 900, 400, 100, 300, 1, 10);
    this.enemy = new Enemy(this, 1000, 500, 100, 100, 1, 10);
    this.wall = new Wall (this, 500, 500);
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.collider(this.wall, this.enemy);
  }

  update(time, delta) {    
  }
}