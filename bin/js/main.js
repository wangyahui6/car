var Handler = Laya.Handler;
var Loader = Laya.Loader;
var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Pool = Laya.Pool;
var Car = ui.car;
var Background = ui.background;
var Enemy = ui.enemy;
var instance;
var DataBus = /** @class */ (function () {
    function DataBus() {
        this.enemys = [];
        this.frame = 0;
        this.gameOver = false;
        if (instance)
            return instance;
        instance = this;
        this.reset();
    }
    DataBus.prototype.reset = function () {
        this.enemys = [];
    };
    DataBus.prototype.removeEnemy = function (enemy) {
        this.enemys.shift();
        Pool.recover('enemy', enemy);
    };
    return DataBus;
}());
var databus = new DataBus();
var main = /** @class */ (function () {
    function main() {
        this.bg = new Background();
        this.hexo = new Car();
        Laya.timer.frameLoop(1, this, this.mainLoop);
    }
    main.prototype.update = function () {
        var _this = this;
        this.bg.update();
        var enemys = [].concat(databus.enemys);
        enemys.forEach(function (item) {
            item.update(databus);
            _this.hexo.checkCollision(item, databus);
        });
        this.generateEnemy();
    };
    main.prototype.mainLoop = function () {
        if (databus.gameOver)
            return;
        databus.frame++;
        this.update();
    };
    main.prototype.generateEnemy = function () {
        if (databus.frame % 20 === 0) {
            var randow = Math.random() * (0.84 - 0.16) + 0.16;
            var categoryRandow = Math.floor(Math.random() * 3);
            var xDistance = Browser.width * randow;
            var enemy = Pool.getItemByClass('enemy', Enemy);
            enemy.init(20, xDistance, categoryRandow);
            databus.enemys.push(enemy);
        }
    };
    return main;
}());
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(Browser.width, Browser.height, WebGL);
Laya.Stat.show(250, 0);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);
function beginLoad() {
    Laya.loader.load("res/atlas/car.atlas", Handler.create(null, onLoaded));
}
function onLoaded() {
    new main();
}
//# sourceMappingURL=main.js.map