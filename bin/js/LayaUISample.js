var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var background = /** @class */ (function () {
    function background() {
        this.YDistance = 0;
        this.carDistance = 0;
        this.bg1 = new Laya.Image('road.jpg');
        this.bg2 = new Laya.Image('road.jpg');
        var car = new Laya.Image('car/car1.png');
        this.car3 = new Laya.Image('car/car3.png');
        this.bg1.size(Browser.width, Browser.height);
        this.bg2.size(Browser.width, Browser.height);
        this.bg2.pos(0, -Browser.height);
        car.pos(Laya.stage.width / 2, Laya.stage.height - 400);
        this.car3.pos(200, -Browser.height);
        Laya.stage.addChild(this.bg1);
        Laya.stage.addChild(this.bg2);
        Laya.stage.addChild(car);
        Laya.stage.addChild(this.car3);
        Laya.timer.frameLoop(1, this, this.animation);
    }
    background.prototype.animation = function () {
        this.YDistance += 4;
        this.carDistance += 18;
        if (this.YDistance >= Browser.height) {
            this.YDistance = 0;
        }
        this.bg1.pos(0, this.YDistance);
        this.bg2.pos(0, -Browser.height + this.YDistance);
        this.car3.pos(200, this.carDistance);
    };
    return background;
}());
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(Browser.width, Browser.height, WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/car.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    var bg1 = new background();
}
//# sourceMappingURL=LayaUISample.js.map