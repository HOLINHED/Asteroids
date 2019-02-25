class Rock extends Entity {

   private size: number;
   private radii: number[] = new Array<number>();

   constructor(x: number, y: number, size: number, p: p5, c: Game) {
      super(x,y,size,size,p,c);
      this.p = p;
      this.size = size;

      const vx: number = this.p.random(-7,7);
      const vy: number = this.p.random(-6,8);

      this.setVx(vx);
      this.setVy(vy);

      for (let i: number = 0; i < this.p.random(12,24); i++) {
         const r: number = this.p.random((this.size / 2) - 13, (this.size / 2) + 13);
         this.radii.push(r);
      }

   }

   public draw() : void {

      this.p.noFill();
      this.p.stroke(255);

      let currR: number = 0;

      this.p.beginShape();
      for (let a: number = 0; a < this.p.TWO_PI; a += this.p.PI / 10) {

         const r: number = this.radii[currR];

         const x: number = (r * this.p.cos(a)) + this.getPos().x;
         const y: number = (r * this.p.sin(a)) + this.getPos().y;

         this.p.vertex(x,y);

         currR = currR < this.radii.length ? currR + 1 : 0;

      }
      this.p.endShape(this.p.CLOSE);

   }

   public split() : void {

   }

}