import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
        this.inBattle = true;
        this.lifeFlag = true;
        this.speedy = false;
        this.lifeDelay = 1000;
        this.lifeCD = 0;
    }
    
    playerController(){
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-this.speed);
      }
      else {
        if (this.cursors.right.isDown) {
          this.body.setVelocityX(this.speed);
        }
        else {
          this.body.setVelocityX(0);        
        }
      }
  
      if (this.cursors.up.isDown) {
          this.body.setVelocityY(-this.speed);
      }
      else {
        if (this.cursors.down.isDown) {
          this.body.setVelocityY(this.speed);
        }
        else {
          this.body.setVelocityY(0);        
        }
      } 
    }
    

    changeSpeed(spd){
        //la cantidad en la que aumente la velocidad la testearemos
        this.speed += spd;
        this.speedy = true;
    }

    reduceEnergy(){
      this.reduceHealth(5);   //estaría mejor decir por constructora mediante una variable la cantidad constante a reducir
      //this.lifeFlag = false;
    }

    preUpdate(t) {
        this.playerController();
        if(!this.inBattle && !this.speedy){   //para cambiar el booleano hay que hacer primero el sistema de zonas, no sé como lo cambiaremos aún
          this.changeSpeed(this.speed);
        }
        if (t - this.lifeCD > this.lifeDelay){
          this.reduceEnergy();
          this.lifeCD = t;
          console.log(this.health);
        }
    }
}