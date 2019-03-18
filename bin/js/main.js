var Handler = Laya.Handler;
var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Pool = Laya.Pool;
var Car = ui.car;
var Background = ui.background;
var BasicEnemy = ui.basicEnemy;
var EvilEnemy = ui.evilEnemy;
var NaughtyEnemy = ui.naughtyEnemy;
var Timer = ui.timer;
var Terminal = ui.terminal;
import carList from './round1.js';
var enemyMap = {
    basic: BasicEnemy,
    evil: EvilEnemy,
    naughty: NaughtyEnemy
};
let instance;
class DataBus {
    constructor() {
        this.enemys = [];
        this.frame = 0;
        this.gameOver = false;
        if (instance)
            return instance;
        instance = this;
        this.reset();
    }
    reset() {
        this.enemys = [];
    }
    removeEnemy(enemy, category) {
        let index = this.enemys.findIndex(item => item === enemy);
        this.enemys.splice(index, 1);
        Pool.recover(category, enemy);
    }
}
let databus = new DataBus();
class main {
    constructor() {
        this.enemyNum = 0;
        this.bg = new Background();
        this.hexo = new Car();
        this.terminal = new Terminal();
        this.timer = new Timer();
        this.timer.start();
        this.curItem = carList[this.enemyNum];
        this.sucTxt = new Laya.Text();
        this.sucTxt.text = '恭喜过关';
        this.sucTxt.color = "#ffffff";
        this.sucTxt.stroke = 2;
        this.sucTxt.strokeColor = "#666666";
        this.sucTxt.fontSize = 60;
        this.sucTxt.pos(Browser.width / 2 - this.sucTxt.width / 2, 300);
        Laya.timer.frameLoop(1, this, this.mainLoop);
    }
    update() {
        this.hexo.setSpeed(); // 设置主角车的速度，最高加速到30，当放开手指或者造到撞击则减速
        this.bg.update(this.hexo.speed); // 赛道背景根据主角车的速度移动，其实主角车并未移动，是赛道背景的反向移动造成了主角车前进的错觉
        let enemys = [].concat(databus.enemys); // 所有敌车
        enemys.forEach((item) => {
            item.update(databus, this.hexo); // 敌车的移动以及跑出屏幕时的回收
            this.hexo.checkCollision(item); // 监测主角车是否造到敌车撞击
        });
        this.generateEnemy(); // 根据设定，在合适的位置产生敌车
        if (this.bg.totalDistance >= 32000) {
            this.terminal.show(this.hexo);
        }
    }
    mainLoop() {
        const isSucc = this.hexo.checkTerminal(this.terminal);
        if (isSucc) {
            this.timer.stop();
            Laya.stage.addChild(this.sucTxt);
            return;
        }
        if (!this.timer.totalSeconds) {
            this.sucTxt.text = '很遗憾，失败了';
            this.sucTxt.pos(Browser.width / 2 - this.sucTxt.width / 2, 300);
            Laya.stage.addChild(this.sucTxt);
        }
        databus.frame++;
        this.update();
    }
    generateEnemy() {
        if (this.curItem && this.bg.totalDistance >= this.curItem.distance) {
            let enemy = Pool.getItemByClass(this.curItem.category, enemyMap[this.curItem.category]);
            enemy.init(this.curItem.speed, Browser.width * this.curItem.xDistance);
            databus.enemys.push(enemy);
            this.curItem = carList[++this.enemyNum];
        }
    }
}
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