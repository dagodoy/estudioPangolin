import Player from "./player.js";
import Enemy from "./enemy.js";
import Wall from "./wall.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  
  preload() {  
    this.c1 = this.matter.world.nextCategory();
    this.c2 = this.matter.world.nextCategory();
    this.load.image('character', 'favicon.png');
    this.load.image('wall', 'player.png');
  }

  create() {
    this.player = new Player(this, 900, 400, 100, 10, 1, 10);
    this.enemy = new Enemy(this, 1000, 500, 100, 0, 1, 10);
    this.wall = new Wall (this, 500, 500);
    this.player.setCollisionCategory(this.c1);
    //this.player.hitbox.setCollisionCategory(this.c2);
    this.wall.setCollisionCategory(this.c2);
    
    this.enemy.setCollidesWith([this.c2]);
    this.player.setCollidesWith([this.c2]);
    this.matter.world.on('collisionstart', function(event){ 
        let pairs = event.pairs;
        console.log(pairs[0]);
        //console.log(event);
        //console.log(pairs[0].bodyA.label);
        //console.log(pairs[0].bodyB.label);
        if (pairs[0].bodyA.label === 'playerHitbox' && pairs[0].bodyB.label === 'enemy') {
          pairs[0].bodyB.gameObject.reduceHealth(5);
          console.log(pairs[0].bodyB.gameObject.health);
        }

    });
  }

  update(time, delta) {    

  }

}