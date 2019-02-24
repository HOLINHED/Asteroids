class Astroids extends Game{

   private player: Player;
   private rocks: Rock[] = new Array<Rock>();
   private bullets: Bullet[] = new Array<Bullet>();
   private score: number;

   constructor(p: p5) {
      super(p);
   }

   public setup() : void {
      
      this.score = 0;

      this.player = new Player(this.p.width/2, this.p.height/2,this.p);

      for (let i = 0; i < 10; i++) {
         
         const x = this.p.random(this.p.width);
         const y = this.p.random(this.p.height);

         const bullet: Bullet = new Bullet(x,y,this.p);

         this.bullets.push(bullet);
      }

   }

   public update() : void {

      this.player.update();
      this.player.draw();

      for (let bullet of this.bullets) {
         bullet.update();
         bullet.draw();
      }

   }
}