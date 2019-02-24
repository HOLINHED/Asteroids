class Rock extends Entity {

   private size: number;

   constructor(x: number, y: number, size: number, p: p5) {
      super(x,y,size,size,p);
      this.p = p;
      this.size = size;
   }

   public draw() : void{

      this.p.fill(255);
      this.p.noStroke();

      this.p.ellipse(this.getPos().x, this.getPos().y, this.size);
   }

}