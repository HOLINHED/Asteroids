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
        return { x: this.x, y: this.y };
    };
    return Entity;
}());
var Game = (function () {
    function Game(p) {
        this.p = p;
        this.running = true;
    }
    Game.prototype.setRunning = function (running) {
        this.running = running;
    };
    Game.prototype.isRunning = function () {
        return this.running;
    };
    return Game;
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
var Astroids = (function (_super) {
    __extends(Astroids, _super);
    function Astroids(p) {
        var _this = _super.call(this, p) || this;
        _this.rocks = new Array();
        _this.bullets = new Array();
        return _this;
    }
    Astroids.prototype.setup = function () {
        this.score = 0;
        this.player = new Player(this.p.width / 2, this.p.height / 2, this.p);
        for (var i = 0; i < 10; i++) {
            var x = this.p.random(this.p.width);
            var y = this.p.random(this.p.height);
            var bullet = new Bullet(x, y, this.p);
            this.bullets.push(bullet);
        }
    };
    Astroids.prototype.update = function () {
        this.player.update();
        this.player.draw();
        for (var _i = 0, _a = this.bullets; _i < _a.length; _i++) {
            var bullet = _a[_i];
            bullet.update();
            bullet.draw();
        }
    };
    return Astroids;
}(Game));
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(x, y, p) {
        var _this = _super.call(this, x, y) || this;
        _this.p = p;
        return _this;
    }
    Bullet.prototype.draw = function () {
    };
    return Bullet;
}(Entity));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y, p) {
        var _this = _super.call(this, x, y) || this;
        _this.RADIUS = 35;
        _this.p = p;
        _this.angle = 0;
        return _this;
    }
    Player.prototype.draw = function () {
        this.p.noFill();
        this.p.stroke(255);
        this.p.ellipse(this.getPos().x, this.getPos().y, this.RADIUS);
        var x = (this.RADIUS * this.p.cos(this.angle)) + this.getPos().x;
        var y = (this.RADIUS * this.p.sin(this.angle)) + this.getPos().y;
        this.p.line(this.getPos().x, this.getPos().y, x, y);
    };
    Player.prototype.setAngle = function (angle) {
        this.angle = angle;
    };
    Player.prototype.getAngle = function () {
        return this.angle;
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
    var game;
    p.setup = function () {
        p.createCanvas(600, 600);
        game = new Astroids(p);
        game.setup();
    };
    p.draw = function () {
        p.background(0);
        if (!game.isRunning()) {
            game = new Astroids(p);
        }
        game.update();
    };
};
var sketchP = new p5(sketch);
//# sourceMappingURL=build.js.map