import Character from "./character.js";

export default class Player extends Character{
    constructor(scene, x, y, life, speed, atkSpeed, atkDmg){
        super(scene, x, y, life, speed, atkSpeed, atkDmg)
        this.inBattle = false;
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

    changeSpeed(){
        //la cantidad en la que aumente la velocidad la testearemos
        this.speed *= 2;
        this.atkSpeed *=2;
    }

    preUpdate() {
        this.playerController();
        if(!this.inBattle){   //para cambiar el booleano hay que hacer primero el sistema de zonas, no sé como lo cambiaremos aún
          this.changeSpeed();
        }
    }
}