abstract class Game {

   public p: p5;
   private running: boolean;

   constructor(p: p5) {
      this.p = p;
      this.running = true;

      this.p.rectMode('center');
   }

   abstract setup() : void;

   abstract update() : void;

   protected abstract checkKey() : void;

   public setRunning(running: boolean) : void {
      this.running = running;
   }

   public isRunning() : boolean {
      return this.running;
   }

}