class Rock extends Entity {

   private size: number;
   private angle: number;
   private angleMod: number;
   private radii: number[] = new Array<number>();

   constructor(x: number, y: number, size: number, p: p5, c: Game) {
      super(x,y,size,size,p,c);
      this.p = p;
      this.size = size;
      this.angle = 0;
      this.angleMod = (this.p.random(this.p.PI / 250, this.p.PI / 295)) * 
         (this.p.random() > 0.5 ? -1 : 1);

      const vx: number = this.p.random(-7,7);
      const vy: number = this.p.random(-6,8);

      this.setVx(vx);
      this.setVy(vy);

      const radMod = this.p.log(this.size) * 1.25;

      for (let i: number = 0; i < this.p.random(12,24); i++) {
         const r: number = this.p.random((this.size / 2) - radMod, (this.size / 2) + radMod);
         this.radii.push(r);
      }

   }

   public draw() : void {

      this.p.noFill();
      this.p.stroke(255);

      // Check collision with bullets
      const bullets: Bullet[] = this.context.share().bullets;

      for (let bullet of bullets) {
               
         if (this.isColliding(bullet)) {
            bullets.splice(bullets.indexOf(bullet), 1);
            this.split();
         }
      }

      let currR: number = 0;

      // HITBOX FOR COLLISION TESTING
      //this.p.ellipse(this.getPos().x,this.getPos().y,this.size);

      // DRAW ROCK
      this.p.push();

      this.p.translate(this.getPos().x, this.getPos().y);
      this.p.rotate(this.angle);

      this.p.beginShape();
      for (let a: number = 0; a < this.p.TWO_PI; a += this.p.PI / 10) {

         const r: number = this.radii[currR];

         const x: number = (r * this.p.cos(a));
         const y: number = (r * this.p.sin(a));

         this.p.vertex(x,y);

         currR = currR < this.radii.length ? currR + 1 : 0;

      }
      this.p.endShape(this.p.CLOSE);

      this.p.pop();

      this.angle += this.angleMod;

   }

   public split() : void {

      const rocks: Array<Bullet> = this.context.share().rocks;

      if (this.getDims().w > 50) {
      
         const vx: number = this.getV().vx * 0.75;
         const vy: number = this.getV().vy * 0.75;

         const rock1: Rock = new Rock(this.getPos().x, this.getPos().y, this.getDims().w / 2, this.p, this.context);
         const rock2: Rock = new Rock(this.getPos().x, this.getPos().y, this.getDims().w / 2, this.p, this.context);

         rock1.setVx(vx);
         rock2.setVx(-vx);
         rock1.setVy(vy);
         rock2.setVy(vy);

         rocks.push(rock1,rock2);

      }

      rocks.splice(rocks.indexOf(this), 1);

   }

}