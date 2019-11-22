import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg);
        this.body.label = 'enemy';
        this.hitbox.label = 'enemyHitbox';
        this.range = this.scene.matter.add.circle(200, 50,50,  null);
        this.range.active = false;
        this.range.isSensor = true;
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
        this.moveHitbox();   
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}