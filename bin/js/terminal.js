var ui;
(function (ui) {
    var Sprite = Laya.Sprite;
    class terminal {
        constructor() {
            this.yDistance = 0;
            this.terminal = new Sprite();
            //画直线
            this.terminal.loadImage('terminal.png');
            this.terminal.scale(1.5, 1);
        }
        show(hexo) {
            Laya.stage.addChild(this.terminal);
            this.yDistance += hexo.speed;
            this.terminal.pos(18, this.yDistance);
        }
    }
    ui.terminal = terminal;
})(ui || (ui = {}));
//# sourceMappingURL=terminal.js.map