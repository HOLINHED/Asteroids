class Input{

   // TODO: Implement null movement

   private p: p5;
   private key: { code: number };

   constructor(p: p5) {
      this.p = p;
      this.key = { code: 0 };

      const pointer: p5 = this.p;
      const keyPointer = this.key;

      this.p.keyPressed = function() {
         keyPointer.code = pointer.keyCode;
      }

      this.p.keyReleased = function() {
         keyPointer.code = 0;
      }

   }

   public getKey() : number {
      return this.key.code;
   }

}