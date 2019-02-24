var sketch = (p: p5) => {

    let game: Game;
    
    p.setup = () => {
        p.createCanvas(600, 600);
        game = new Astroids(p);
        game.setup();
    }

    p.draw = () => {
        p.background(0);

        if (!game.isRunning()) {
            game = new Astroids(p);
        }

        game.update();
    }
}

var sketchP = new p5(sketch);