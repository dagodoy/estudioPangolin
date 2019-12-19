export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, offset, spriteSheet, character, area, isAttack) {
        super(scene.matter.world, x, y, spriteSheet);
    
        this.scene.anims.create({
            key: 'right_slash', 
            frames: this.scene.anims.generateFrameNames('cut', {prefix: 'cut_a_', start: 1, end:6}),
            frameRate: 12});
        this.scene.anims.create({
            key: 'left_slash', 
            frames: this.scene.anims.generateFrameNames('cut', {prefix: 'cut_a_', start: 7, end:12}),
            frameRate: 12});

        this.setExistingBody(area, true)
        this.character = character;
        this.offset = offset;
        this.isAttack = isAttack; 
        this.scene.add.existing(this);
        this.scene.matter.world.add(this);

        this.inGame = false;
        this.body.isSensor = true;
    }
    moveHitbox(dirx, diry){
        let mod = Math.sqrt(dirx*dirx + diry * diry);
        this.x = this.character.body.position.x + this.offset*dirx/mod;
        this.y = this.character.body.position.y + this.offset*diry/mod;
        if (this.isAttack) this.rotation = Math.atan(diry/dirx);
    }
    moveHitboxStatic(){
        this.x = this.character.body.position.x + this.offset;
        this.y = this.character.body.position.y + this.offset;
    }

    playAnimation(facing){
        if (facing == 1)this.play('right_slash');
        else this.play('left_slash');
    }

    preUpdate(t,d){
        super.preUpdate(t,d);
    }
}
