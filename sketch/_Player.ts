class Player extends Entity{

   private angle: number;
   private p: p5;

   constructor(x: number, y: number, p: p5) {
      super(x,y);
      this.p = p;
   }

   public draw() : void{

      this.p.rect(this.getPos().x,this.getPos().y,50,50);
   }

   public getAngle() : number{
      return this.angle;
   }

}