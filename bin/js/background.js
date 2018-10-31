var ui;
(function (ui) {
    var background = /** @class */ (function () {
        function background() {
            this.YDistance = 0;
            this.isBottom = false;
            this.bg1 = new Laya.Image('road.jpg');
            this.bg2 = new Laya.Image('road.jpg');
            this.bg1.size(Browser.width, Browser.height);
            this.bg2.size(Browser.width, Browser.height);
            this.bg2.pos(0, -Browser.height);
            Laya.stage.addChild(this.bg1);
            Laya.stage.addChild(this.bg2);
        }
        background.prototype.render = function () {
            this.bg1.pos(0, this.YDistance);
            this.bg2.pos(0, -Browser.height + this.YDistance);
            if (this.isBottom) {
                this.YDistance = 0;
                this.bg1.pos(0, this.YDistance);
                this.bg2.pos(0, -Browser.height + this.YDistance);
                this.isBottom = false;
            }
        };
        background.prototype.update = function () {
            var SPEED = 30;
            this.YDistance += SPEED;
            if ((this.YDistance + SPEED) >= Browser.height) {
                this.isBottom = true;
            }
            this.render();
        };
        return background;
    }());
    ui.background = background;
})(ui || (ui = {}));
//# sourceMappingURL=background.js.map