var Handler = Laya.Handler;
var WebGL = Laya.WebGL;
var Browser = Laya.Browser;
var Pool = Laya.Pool;
var Car = ui.car;
var Background = ui.background;
var BasicEnemy = ui.basicEnemy;
var EvilEnemy = ui.evilEnemy;
var NaughtyEnemy = ui.naughtyEnemy;
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
        this.enemys.shift();
        Pool.recover(category, enemy);
    }
}
let databus = new DataBus();
class main {
    constructor() {
        this.bg = new Background();
        this.hexo = new Car();
        Laya.timer.frameLoop(1, this, this.mainLoop);
    }
    update() {
        this.bg.update();
        let enemys = [].concat(databus.enemys);
        enemys.forEach((item) => {
            item.update(databus, this.hexo);
            this.hexo.checkCollision(item, databus);
        });
        this.generateEnemy();
    }
    mainLoop() {
        if (databus.gameOver)
            return;
        databus.frame++;
        this.update();
    }
    generateEnemy() {
        let carItem = carList[databus.frame];
        if (carItem) {
            let enemy = Pool.getItemByClass(carItem.category, enemyMap[carItem.category]);
            enemy.init(carItem.speed, Browser.width * carItem.xDistance);
            databus.enemys.push(enemy);
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