import Enemy from "./enemy.js"

export default class Room extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, spriteSheet, area, enemies, r) {
        super(scene.matter.world, x, y, spriteSheet);
    

        this.setExistingBody(area, true)
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);
        this.enemies = enemies
        this.spawnPoints;
        for (let i = 0; i < this.enemies; i++){
            this.spawnPoints[i].x = this.x + this.body.width/2 + r * Math.cos(2*Math.PI/i);
            this.spawnPoints[i].y = this.y + this.body.height/2 + r * Math.cos(2*Math.PI/i);
        }
        this.active = false;
        this.body.isSensor = true;
        this.on("collisionstart", this.begin, this)
    }
    begin(collision){
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
        }
    }
}
