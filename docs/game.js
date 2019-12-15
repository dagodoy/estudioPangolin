import Player from "./player.js";
import Enemy from "./enemy.js";
import Wall from "./wall.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  
  preload() {  
    this.cplayer = this.matter.world.nextCategory();
    this.cphitbox = this.matter.world.nextCategory();

    this.cenemy = this.matter.world.nextCategory();   
    this.cehitbox = this.matter.world.nextCategory();

    this.cwall = this.matter.world.nextCategory();
    
    this.load.image('character', 'favicon.png');
    this.load.image('wall', 'player.png');
    this.load.atlas('vampire', 'vampireatlas.png', 'vampireatlas_atlas.json');
    this.load.atlas('enemy', 'enemyatlas.png', 'enemyatlas_atlas.json');
    this.load.atlas('attack', 'cut_atlas.png', 'cut_atlas_atlas.json');
    this.load.image('ForestTile200', 'ForestTile200.png');
    this.load.tilemapTiledJSON('map', 'map.json');


  }

  create() {
    

    this.player = new Player(this, 900, 400, 100, 5, 1, 10, 'vampire');
    this.enemy = new Enemy(this, 1000, 500, 100, 1, 1, 10, 'enemy');
    this.wall = new Wall (this, 500, 500);
    this.input.mouse.capture = true;

    //Asignar categorías de colisión
    this.player.setCollisionCategory(this.cplayer);
    this.player.hitbox.setCollisionCategory(this.cphitbox);

    this.enemy.setCollisionCategory(this.cenemy);
    this.enemy.hitbox.setCollisionCategory(this.cehitbox);
    this.enemy.range.setCollisionCategory(this.cehitbox);

    this.wall.setCollisionCategory(this.cwall);
    
    //Asignar qué colisiona con qué
    this.player.setCollidesWith([this.cwall, this.cehitbox]);
    this.player.hitbox.setCollidesWith([this.cenemy]);

    this.enemy.setCollidesWith([this.cphitbox, this.cwall]);
    this.enemy.hitbox.setCollidesWith([this.cplayer]);
    this.enemy.range.setCollidesWith([this.cplayer]);

    this.wall.setCollidesWith([this.cplayer, this.cenemy])
    
    
    this.matter.world.on('collisionactive', function(event){ 
        let pairs = event.pairs;
        for (let i = 0; i < pairs.length; i++){
          //console.log(pairs[i]);
          if (pairs[i].bodyA.label === 'playerHitbox' && pairs[i].bodyB.label === 'enemy') {
            if (pairs[i].bodyA.gameObject.active){
              pairs[i].bodyB.gameObject.reduceHealth(5);
              pairs[i].bodyB.gameObject.push(new Phaser.Math.Vector2(10, 10));
            } 
          }
          else if(pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyHitbox'){
            if (pairs[i].bodyB.gameObject.active){
              pairs[i].bodyA.gameObject.reduceHealth(5);
              console.log(pairs[i].bodyA.gameObject.health);
            } 
          }
        }
    });
    this.matter.world.on('collisionstart', function(event){
      let pairs = event.pairs;
      //console.log(pairs);
      for (let i = 0; i < pairs.length; i++){
        if (pairs[i].bodyA.label === 'player' && pairs[i].bodyB.label === 'enemyRange') {
          pairs[i].bodyB.gameObject.character.isReady = true;
        }   
      }
    });

    this.map = this.make.tilemap({
      key: 'map',
      tileWidth: 64,
      tileHeight: 64
    });
    this.tileset = this.map.addTilesetImage('ForestTile200');
  }

  update(time, delta) {    

  }

}