import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
    }
    //cambiar cuando hagamos polimorfismo
    moveTowards(x, y){
        var alpha = Math.atan((y-this.y)/(x-this.x));
        //el problema es que los cosenos los devuelve siempre positivos
        this.body.setVelocityX(this.speed * Math.cos(alpha));
        this.body.setVelocityY(this.speed * Math.sin(alpha));
    }

    preUpdate() {
        this.moveTowards(this.scene.player.x, this.scene.player.y);
    }
}