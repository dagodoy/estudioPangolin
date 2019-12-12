import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet){
        super(scene, x, y, life, speed, atkSpeed, atkDmg, spriteSheet);
        this.body.label = 'enemy';
        this.hitbox.body.label = 'enemyHitbox';
        //this.range = this.scene.matter.add.circle(200, 50,50,  null);
        //this.range.active = false;
        //this.range.isSensor = true;
    }
    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        if (this.x > x){
            this.setVelocityX(-this.speed * Math.cos(alpha));
            this.setVelocityY(-this.speed * Math.sin(alpha));
        }
        else{
            this.setVelocityX(this.speed * Math.cos(alpha));
            this.setVelocityY(this.speed * Math.sin(alpha));
        }
    }

    preUpdate() {
        this.hitbox.moveHitbox(this.scene.player.x - this.body.position.x, this.scene.player.y - this.body.position.y);   
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}