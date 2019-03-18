var ui;
(function (ui) {
    var Browser = Laya.Browser;
    class timer {
        constructor() {
            this.totalSeconds = 50;
            this.txt = new Laya.Text();
            //设置文本内容
            this.txt.text = String(this.totalSeconds);
            //设置文本颜色为白色，默认颜色为黑色
            this.txt.color = "#ffffff";
            this.txt.fontSize = 50;
            //将文本内容添加到舞台 
            Laya.stage.addChild(this.txt);
            this.txt.pos(Browser.width - 120, Browser.height - 100);
        }
        start() {
            this.timeId = setTimeout(() => {
                this.totalSeconds--;
                this.txt.text = String(this.totalSeconds);
                if (this.totalSeconds) {
                    this.start();
                }
                else {
                    clearTimeout(this.timeId);
                }
            }, 1000);
        }
        stop() {
            clearTimeout(this.timeId);
        }
    }
    ui.timer = timer;
})(ui || (ui = {}));
//# sourceMappingURL=timer.js.map