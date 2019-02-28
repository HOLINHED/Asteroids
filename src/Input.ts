class Input{

   private p: p5;
   private key: number[] = new Array<number>();

   /**
    * @param p Reference to the p5 object to modify the default keyPressed,
    *          keyReleased, mousePressed, and mouseReleased methods.
    */
   constructor(p: p5) {
      this.p = p;

      // Made these references because the 'this' selector
      // doesn't refer to this class within the new
      // function.
      const pointer: p5 = this.p;
      const keyPointer = this.key;

      // Adds the key that was pressed to the array.
      this.p.keyPressed = function() {
         keyPointer.push(pointer.keyCode);
      }

      // Removes key from array when it is released.
      this.p.keyReleased = function() {
         const index: number = keyPointer.indexOf(pointer.keyCode);
         keyPointer.splice(index,1);
      }

   }

   /**
    * @param {number} keycode The keycode to be found in the array.
    * 
    * @returns {boolean} Returns true if the keycode was found in the
    *                    array, false otherwise.
    */
   public isPressed(keycode: number) : boolean {
      return this.key.indexOf(keycode) != -1;
   }

}