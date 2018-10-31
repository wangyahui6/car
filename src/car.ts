module ui{
    import Browser = Laya.Browser;
    import Event = Laya.Event;
    var LEFT_LIMIT = 0.14;
    var RIGHT_LIMIT = 0.81;
    export class car {
        private car: Laya.Image;
        private explosion: Laya.Animation;
        
        constructor() {
            this.car = new Laya.Image('car/main.png');
            this.car.pos(Browser.width / 2, Browser.height - 500);
            Laya.loader.load('res/atlas/explosion.atlas', Laya.Handler.create(this,this.onExplosionLoaded));
            Laya.stage.addChild(this.car);
            Laya.stage.on(Event.MOUSE_MOVE, this, (e) => {
                this.setCarPos(e.stageX);
            });
        }

        private setCarPos(x) {
            var disPortion = x / Browser.width;
            if(disPortion > LEFT_LIMIT && disPortion < RIGHT_LIMIT){
                this.car.pos(x, Browser.height - 500);
            } else if( disPortion <= LEFT_LIMIT){
                this.car.pos(Browser.width * LEFT_LIMIT, Browser.height - 500);
            } else {
                this.car.pos(Browser.width * RIGHT_LIMIT, Browser.height - 500);
            }
        }
        private onExplosionLoaded() {
            //创建一个Animation实例
            this.explosion = new Laya.Animation();
            //加载动画文件
            this.explosion.loadAnimation("explosion.ani");
            Laya.stage.addChild(this.explosion);
        }
        public checkCollision(enemy, databus) {
            const isHit = this.car.hitTestPoint(enemy.x, enemy.y + 122) || 
                    this.car.hitTestPoint(enemy.x + 60, enemy.y + 122);
            if(isHit){
                this.explosion.pos(this.car.x - 70, this.car.y - 14);
                this.explosion.play(0, false);
                Laya.stage.removeChild(this.car);
                databus.gameOver = true;
            }
            return isHit;
        }
    }
}