export default class Lifebar extends Phaser.Physics.Matter.Sprite {
  constructor(scene,x,y, maxHealth){
    super(scene.matter.world, x, y, 'lifebar');
    this.scene.add.existing(this);

    this.maxHealth = maxHealth;
  }


  reduceBar(damage, health){
    //sacar el porcentaje de daño con respecto a la vida total
    this.relation = damage / this.maxHealth;
    console.log(this.relation);
    //restar ese porcentaje a la imagen
    this.percent = this.width*this.relation;
    console.log(this.percent);
    this.setDisplaySize(this.width-(this.percent), this.height);
    
  }
}
