abstract class Game {

   public p: p5;
   private running: boolean;

   constructor(p: p5) {
      this.p = p;
      this.running = true;
   }

   abstract setup() : void;

   abstract update() : void;

   public setRunning(running: boolean) : void {
      this.running = running;
   }

   public isRunning() : boolean {
      return this.running;
   }

}