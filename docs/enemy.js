import Character from "./character.js";

export default class Enemy extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
    }
    preUpdate() {
    }
}