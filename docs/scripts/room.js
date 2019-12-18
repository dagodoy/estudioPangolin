import Enemy from "./enemy.js"

export default class Room extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, spriteSheet, area, enemies, r) {
        super(scene.matter.world, x, y, spriteSheet);
    
        this.setExistingBody(area, true)
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);
        this.enemies = enemies;
        this.spawnPoints = [];
        for (let i = 0; i < this.enemies; i++){
            this.spawnPoints[i] = new Phaser.Math.Vector2()
            this.spawnPoints[i].x = (this.body.bounds.max.x + this.body.bounds.min.x)/2 + r * Math.cos(2*i*Math.PI/enemies);
            this.spawnPoints[i].y = (this.body.bounds.max.y + this.body.bounds.min.y)/2 + r * Math.sin(2*i*Math.PI/enemies);
        }
        console.log(this.spawnPoints)
        this.active = false;
        this.body.isSensor = true;
        this.on("collisionstart", function(){console.log("a")}, this)
        this.generateEnemies();
        }
    begin(collision){
        console.log("a")
        if (collision.body.tag = "player"){
            this.active = true;
            for (let i = 0; i < this.enemies; i++){
                this.scene.malos[i].is = true;
            }
        }
    }
    generateEnemies(){
        for (let i = 0; i < this.enemies; i++){
            this.scene.malos[i] = new Enemy(this.scene, this.spawnPoints[i].x, this.spawnPoints[i].y, 100, 0, 1, 10, 'enemy');
            this.scene.malos[i].setCollisionCategory(this.scene.cenemy);
            this.scene.malos[i].hitbox.setCollisionCategory(this.scene.cehitbox);
            this.scene.malos[i].range.setCollisionCategory(this.scene.cehitbox);
        }
    }
}
