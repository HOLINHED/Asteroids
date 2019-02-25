abstract class Entity {

   private x: number;
   private y: number;
   private vx: number;
   private vy: number;
   private width: number;
   private height: number;
   public p: p5;
   public context: Game;

   constructor(x: number, y: number, width: number, height: number, p: p5, c: Game) {

      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.p = p;
      this.context = c;

      this.vx = 0;
      this.vy = 0;

   }

   public update() : void {
      
      this.x += this.vx;
      this.y += this.vy;

      const width = this.p.width;
      const height = this.p.height;

      if (this.x > width + this.width / 2) {
         this.x = 0 - this.width / 2;
      }

      if (this.x < 0 - this.width / 2) {
         this.x = width - this.width / 2
      }

      if (this.y > height + this.height / 2) {
         this.y = 0 - this.height / 2;
      }

      if (this.y < 0 - this.height / 2) {
         this.y = height - this.height / 2
      }

   }

   public isColliding(entity: Entity) : boolean {
      return false;
   }

   public setVx(vx: number) : void {
      this.vx = vx;
   }

   public setVy(vy: number) : void {
      this.vy = vy;
   }

   public getPos() : {x: number, y: number} {
      return {x: this.x, y: this.y};
   }

   public getDims() : {w: number, h: number} {
      return {w: this.width, h: this.height};
   }

   abstract draw() : void;

}