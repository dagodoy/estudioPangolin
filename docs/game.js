import Player from "./player.js";
import Enemy from "./enemy.js";
import Wall from "./wall.js";

var timedEvent;
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
    timedEvent = this.time.addEvent({ delay: 1000, callback: this.player.control(),
      callbackScope: this});
  }

  update(time, delta) {    
    console.log('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 4));
  }
}