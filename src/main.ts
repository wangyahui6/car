import Handler = Laya.Handler;
import Loader = Laya.Loader;
import WebGL = Laya.WebGL;
import Browser = Laya.Browser;
import Pool = Laya.Pool;
import Car = ui.car;
import Background = ui.background;
import Enemy = ui.enemy;
let instance;
class DataBus {
	public enemys = [];
	private pool: Pool;
	public frame: number = 0;
	public gameOver: boolean = false;
	constructor() {
		if (instance)
			return instance;

		instance = this;

		this.reset();
	}

	private reset():void {
		this.enemys = [];
	}

	public removeEnemy(enemy) {
		this.enemys.shift();
		Pool.recover('enemy', enemy);
	}
}
let databus = new DataBus();

class main {
	private bg: Background;
	private hexo: Car;
	constructor() {
		this.bg = new Background();
		this.hexo = new Car();

		Laya.timer.frameLoop(1, this, this.mainLoop);
	}
	private update():void{
		this.bg.update();
		let enemys = [].concat(databus.enemys);
		enemys.forEach((item) => {
			item.update(databus);
			this.hexo.checkCollision(item, databus);
		});
		this.generateEnemy();
	}
	private mainLoop():void{
		if(databus.gameOver)
		 return;
		databus.frame++;
		this.update();
	}
	
	private generateEnemy(): void {
		if(databus.frame % 20 === 0){
			var randow = Math.random() * (0.84 - 0.16) + 0.16;
			var categoryRandow = Math.floor(Math.random() * 3);
			var xDistance = Browser.width * randow;
			let enemy = Pool.getItemByClass('enemy', Enemy);
			enemy.init(20, xDistance, categoryRandow);
			databus.enemys.push(enemy);
		}
	}
}

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(Browser.width, Browser.height, WebGL);
Laya.Stat.show(250,0);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);

function beginLoad(){
	Laya.loader.load("res/atlas/car.atlas", Handler.create(null, onLoaded));
}

function onLoaded(): void {
	new main();
}

