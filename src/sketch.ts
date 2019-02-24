var sketch = (p: p5) => {

    let Game: Astroids;
    
    p.setup = () => {
        p.createCanvas(600, 600);
        Game = new Astroids(p);
        Game.setup();
    }

    p.draw = () => {
        p.background(0);

        if (!Game.isRunning()) {
            Game = new Astroids(p);
        }

        Game.update();
    }
}

var sketchP = new p5(sketch);