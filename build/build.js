var Astroids = (function () {
    function Astroids(p) {
        this.rocks = new Array();
        this.bullets = new Array();
        this.running = true;
        this.p = p;
    }
    Astroids.prototype.setup = function () {
    };
    Astroids.prototype.update = function () {
    };
    Astroids.prototype.isRunning = function () {
        return this.running;
    };
    return Astroids;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y) {
        return _super.call(this, x, y) || this;
    }
    Bullet.prototype.draw = function () {
    };
    return Bullet;
}(Entity));
var Entity = (function () {
    function Entity(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }
    Entity.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    Entity.prototype.setVx = function (vx) {
        this.vx = vx;
    };
    Entity.prototype.setVy = function (vy) {
        this.vy = vy;
    };
    Entity.prototype.getPos = function () {
        var obj = { x: this.x, y: this.y };
        return obj;
    };
    return Entity;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        return _super.call(this, x, y) || this;
    }
    Player.prototype.draw = function () {
    };
    return Player;
}(Entity));
var Rock = (function (_super) {
    __extends(Rock, _super);
    function Rock(x, y) {
        return _super.call(this, x, y) || this;
    }
    Rock.prototype.draw = function () {
    };
    return Rock;
}(Entity));
var sketch = function (p) {
    var Game;
    p.setup = function () {
        p.createCanvas(600, 600);
        Game = new Astroids(p);
        Game.setup();
    };
    p.draw = function () {
        p.background(0);
        Game.update();
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map