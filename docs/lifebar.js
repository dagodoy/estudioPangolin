export default class Lifebar extends Phaser.Physics.Matter.Sprite {
  constructor(scene,x,y, maxHealth){
    super(scene.matter.world, x, y, 'lifebar');
    this.scene.add.existing(this);
    this.setScrollFactor(0,0);  //no se mueve, se mantiene fija (UI)
    this.maxHealth = maxHealth;
    this.originalWidth = this.width;
  }


  reduceBar(damage){
    //sacar el porcentaje de daño con respecto a la vida total
    this.relation = damage / this.maxHealth;
    console.log(this.relation);
    //restar ese porcentaje a la imagen
    this.percent = this.originalWidth*this.relation;
    this.width = this.width-this.percent;
    //cambiar el tamaño y posición de la imagen
    this.setDisplaySize(this.width, this.height);
    this.setPosition(this.x-(this.percent/2), this.y)
    
  }
}
