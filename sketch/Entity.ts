abstract class Entity {

   private x: number;
   private y: number;
   private vx: number;
   private vy: number;

   constructor(x: number, y: number) {

      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;

   }

   public update() : void {
      
      this.x += this.vx;
      this.y += this.vy;

   }

   public setVx(vx: number) : void {
      this.vx = vx;
   }

   public setVy(vy: number) : void {
      this.vy = vy;
   }

   public getPos() : Object{

      const obj: {x: number, y: number} = {x: this.x, y: this.y};

      return obj;
   }

   abstract draw() : void;

}