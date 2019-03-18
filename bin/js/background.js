var ui;
(function (ui) {
    var Browser = Laya.Browser;
    class background {
        constructor() {
            this.YDistance = 0;
            this.totalDistance = 0;
            this.SPEED = 0;
            this.isBottom = false;
            this.bg1 = new Laya.Image('road.jpg');
            this.bg2 = new Laya.Image('road.jpg');
            this.bg1.size(Browser.width, Browser.height);
            this.bg2.size(Browser.width, Browser.height);
            this.bg2.pos(0, -Browser.height);
            Laya.stage.addChild(this.bg1);
            Laya.stage.addChild(this.bg2);
        }
        render() {
            this.bg1.pos(0, this.YDistance);
            this.bg2.pos(0, -Browser.height + this.YDistance);
            if (this.isBottom) {
                this.YDistance = 0;
                this.bg1.pos(0, this.YDistance);
                this.bg2.pos(0, -Browser.height + this.YDistance);
                this.isBottom = false;
            }
        }
        update(speed) {
            this.YDistance += speed;
            this.totalDistance += speed;
            if ((this.YDistance + speed) >= Browser.height) {
                this.isBottom = true;
            }
            this.render();
        }
    }
    ui.background = background;
})(ui || (ui = {}));
//# sourceMappingURL=background.js.map