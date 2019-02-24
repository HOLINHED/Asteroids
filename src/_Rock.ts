class Rock extends Entity {

   private p: p5;
   private size: number;

   constructor(x: number, y: number, p: p5) {
      super(x,y);
      this.p = p;
      this.size = this.p.random(50,140);
   }

   public draw() : void{

      this.p.fill(255);
      this.p.noStroke();

      this.p.ellipse(this.getPos().x, this.getPos().y, this.size);
   }

}