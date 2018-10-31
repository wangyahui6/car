var ui;
(function (ui) {
    var Browser = Laya.Browser;
    var enemy = /** @class */ (function () {
        function enemy() {
            this.y = -120;
            this.x = 200;
            this.speed = 10;
            this.enemy = new Laya.Image();
        }
        enemy.prototype.init = function (speed, x, category) {
            if (speed === void 0) { speed = 10; }
            if (x === void 0) { x = 200; }
            if (category === void 0) { category = 0; }
            var carList = ['car1', 'car3', 'car4'];
            this.enemy.skin = "car/" + carList[category] + ".png";
            this.speed = speed;
            this.x = x;
            this.y = -120;
            this.enemy.pos(this.x, this.y);
            Laya.stage.addChild(this.enemy);
        };
        enemy.prototype.update = function (databus) {
            if (this.y > Browser.height + 20) {
                Laya.stage.removeChild(this.enemy);
                databus.removeEnemy(this);
            }
            this.y += this.speed;
            this.enemy.pos(this.x, this.y);
        };
        return enemy;
    }());
    ui.enemy = enemy;
})(ui || (ui = {}));
//# sourceMappingURL=enemy.js.map