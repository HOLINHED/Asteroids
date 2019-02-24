class Bullet extends Entity {

   private p: p5;

   constructor(x: number, y: number, p: p5) {
      super(x,y);
      this.p = p;
   }

   public draw() : void{
      
      this.p.noFill();
      this.p.stroke(255);
      
      this.p.ellipse(this.getPos().x, this.getPos().y, 5);
   }

}