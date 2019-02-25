abstract class Game {

   public p: p5;
   public io: Input;
   private running: boolean;

   constructor(p: p5, title: string) {
      this.p = p;
      this.running = true;
      this.io = new Input(this.p);

      document.title = title;

      this.p.rectMode('center');
   }

   abstract setup() : void;

   abstract update() : void;

   protected abstract checkKey() : void;

   abstract share() : any;

   public setRunning(running: boolean) : void {
      this.running = running;
   }

   public isRunning() : boolean {
      return this.running;
   }

}