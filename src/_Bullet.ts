class Bullet extends Entity {

   constructor(x: number, y: number, p: p5) {

      const BULLET_SIZE = 10;

      super(x,y,BULLET_SIZE, BULLET_SIZE, p);
      this.p = p;
   }

   public draw() : void{
      
      this.p.noFill();
      this.p.stroke(255);
      
      this.p.ellipse(this.getPos().x, this.getPos().y, 5);
   }

}