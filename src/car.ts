module ui{
    import Browser = Laya.Browser;
    import Event = Laya.Event;
    var LEFT_LIMIT = 0.14;
    var RIGHT_LIMIT = 0.81;
    
    export class car {
        private car: Laya.Image;
        private explosion: Laya.Animation;
        private isTouch: boolean = false;
        private hiting: boolean = false;
        speed: number = 0;
        
        constructor() {
            this.car = new Laya.Image('car/main.png');
            this.car.pos(Browser.width / 2, Browser.height - 500);
            Laya.loader.load('res/atlas/explosion.atlas', Laya.Handler.create(this,this.onExplosionLoaded));
            Laya.stage.addChild(this.car);
            Laya.stage.on(Event.MOUSE_DOWN, this, (e) => {
                this.isTouch = true;
            });
            Laya.stage.on(Event.MOUSE_MOVE, this, (e) => {
                if(!this.hiting){
                    this.setCarPos(e.stageX);
                }
            });
            Laya.stage.on(Event.MOUSE_UP, this, (e) => {
                this.isTouch = false;
            });
            this.car.pivot(30, 61);
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
        public setSpeed() {
            if(!this.hiting){
                if(this.speed <30 && this.isTouch){
                    this.speed += 0.1;
                } else if(this.speed > 0 && !this.isTouch){
                    this.speed -= 0.1;
                }
            } else {
                if(this.speed > 0){
                    this.speed -= 1;
                }
            }
        }
        private setRotation(deg, direction){
            if(!this.hiting){
                let speed = 10;
                let sumDeg = 0;
                const rotate = () => {
                    this.car.rotation += speed;
                    this.car.x += 15 * direction;
                    sumDeg += speed;
                     var disPortion = this.car.x / Browser.width;
                    if(disPortion <= LEFT_LIMIT || disPortion >= RIGHT_LIMIT ){
                        this.explosion.pos(this.car.x - 70, this.car.y - 14);
                        this.explosion.play(0, false);
                    }else{
                        if(sumDeg < deg){
                            requestAnimationFrame(rotate);
                        }else{
                            this.car.rotation = 0;
                            this.hiting = false;
                        }
                    }
                }
                requestAnimationFrame(rotate);
            }
        }
        private setHit(direction){

        }
        private onExplosionLoaded() {
            //创建一个Animation实例
            this.explosion = new Laya.Animation();
            //加载动画文件
            this.explosion.loadAnimation("explosion.ani");
            Laya.stage.addChild(this.explosion);
        }
        public checkCollision(enemy, databus) {
            if(!this.hiting){
                const isHit = this.car.hitTestPoint(enemy.x, enemy.y + 122) || 
                        this.car.hitTestPoint(enemy.x + 60, enemy.y + 122);
                const direction = (this.car.x - enemy.x) / Math.abs(this.car.x - enemy.x);
                if(isHit){
                    // this.explosion.pos(this.car.x - 70, this.car.y - 14);
                    // this.explosion.play(0, false);
                    this.setRotation(this.speed * 36, direction);
                    this.hiting = true;
                }
                return isHit;
            }
            return this.hiting;
        }
    }
}

