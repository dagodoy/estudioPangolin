import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg);
    }
    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        if (this.x > x){
            this.body.setVelocityX(-this.speed * Math.cos(alpha));
            this.body.setVelocityY(-this.speed * Math.sin(alpha));
        }
        else{
            this.body.setVelocityX(this.speed * Math.cos(alpha));
            this.body.setVelocityY(this.speed * Math.sin(alpha));
        }

    }

    preUpdate() {
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}