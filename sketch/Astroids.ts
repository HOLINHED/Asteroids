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
      
   }

   public update() : void {
      
   }

   public isRunning() : boolean {
      return this.running;
   }
}