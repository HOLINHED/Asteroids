class Astroids {

   private p: p5;
   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private running: boolean = true;

   constructor(p: p5) {
      this.p = p;

   }

   public setup() : void {
      
      this.player = new Player(this.p.width/2, this.p.height/2,this.p);

      for (let i = 0; i < 10; i++) {
         
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         const b: Bullet = new Bullet(x,y,this.p);

         this.bullets.push();
      }

   }

   public update() : void {

      this.player.update();
      this.player.draw();
   }

   public isRunning() : boolean {
      return this.running;
   }
}