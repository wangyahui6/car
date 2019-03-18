var ui;
(function (ui) {
    var Browser = Laya.Browser;
    var Event = Laya.Event;
    var LEFT_LIMIT = 20;
    var RIGHT_LIMIT = 24;
    const SPEED_LIMIT = 30;
    class car {
        constructor() {
            this.isTouch = false;
            this.hiting = false;
            this.speed = 0;
            this.carPos = Browser.height - 350;
            this.car = new Laya.Image('car/main.png');
            this.car.zOrder = 100;
            this.car.scale(1.5, 1.5);
            this.car.pos(Browser.width / 2, this.carPos);
            Laya.loader.load('res/atlas/explosion.atlas', Laya.Handler.create(this, this.onExplosionLoaded));
            Laya.stage.addChild(this.car);
            Laya.stage.on(Event.MOUSE_DOWN, this, (e) => {
                this.isTouch = true;
            });
            Laya.stage.on(Event.MOUSE_MOVE, this, (e) => {
                if (!this.hiting) {
                    this.setcarPos(e.stageX);
                }
            });
            Laya.stage.on(Event.MOUSE_UP, this, (e) => {
                this.isTouch = false;
            });
            this.car.pivot(this.car.width / 2, this.car.height / 2);
        }
        setcarPos(x) {
            const RIGHT_POSI_LIMIT = Browser.width - RIGHT_LIMIT - this.car.displayWidth / 2;
            const LEFT_POSI_LIMIT = LEFT_LIMIT + this.car.displayWidth / 2;
            if (x > LEFT_POSI_LIMIT && x < RIGHT_POSI_LIMIT) {
                this.car.pos(x, this.carPos);
            }
            else if (x <= LEFT_POSI_LIMIT) {
                this.car.pos(LEFT_POSI_LIMIT, this.carPos);
            }
            else {
                this.car.pos(RIGHT_POSI_LIMIT, this.carPos);
            }
        }
        setSpeed() {
            if (!this.hiting) {
                if (this.speed < SPEED_LIMIT && this.isTouch) {
                    this.speed += 0.1;
                }
                else if (this.speed > 0 && !this.isTouch) {
                    this.speed -= 0.1;
                }
            }
            else {
                if (this.speed > 0) {
                    this.speed -= 1;
                }
                else {
                    this.speed = 0;
                }
            }
        }
        setHit(enemySpeed, direction) {
            if (!this.hiting) {
                let initX = this.car.x;
                const RIGHT_POSI_LIMIT = Browser.width - RIGHT_LIMIT - this.car.displayWidth / 2;
                const LEFT_POSI_LIMIT = LEFT_LIMIT + this.car.displayWidth / 2;
                const crash = () => {
                    let rotationSpeed = this.speed;
                    let horizontalSpeed = this.speed * 0.7;
                    this.car.rotation += rotationSpeed;
                    this.car.x += horizontalSpeed * direction;
                    if (this.car.x <= LEFT_POSI_LIMIT || this.car.x >= RIGHT_POSI_LIMIT) {
                        this.explosion.pos(this.car.x - 90, this.car.y - 60);
                        this.explosion.play(0, false);
                        Laya.stage.removeChild(this.car);
                        setTimeout(() => {
                            this.car.rotation = 0;
                            this.hiting = false;
                            this.car.pos(Browser.width / 2, this.carPos);
                            Laya.stage.addChild(this.car);
                        }, 1500);
                    }
                    else {
                        if (this.speed) {
                            requestAnimationFrame(crash);
                        }
                        else {
                            this.car.rotation = 0;
                            this.hiting = false;
                        }
                    }
                };
                requestAnimationFrame(crash);
            }
        }
        onExplosionLoaded() {
            //创建一个Animation实例
            this.explosion = new Laya.Animation();
            //加载动画文件
            this.explosion.loadAnimation("explosion.ani");
            this.explosion.pos(-10000, -10000);
            this.explosion.on('complete', null, () => {
                this.explosion.pos(-10000, -10000);
            });
            Laya.stage.addChild(this.explosion);
        }
        checkCollision(enemy) {
            if (!this.hiting) {
                const isHit = this.car.getBounds().intersects(enemy.enemy.getBounds());
                const direction = (this.car.x - enemy.x) / Math.abs(this.car.x - enemy.x);
                if (isHit) {
                    this.setHit(enemy.speed, direction);
                    this.hiting = true;
                }
                return isHit;
            }
            return this.hiting;
        }
        checkTerminal(terminal) {
            return this.car.getBounds().intersects(terminal.terminal.getBounds());
        }
    }
    ui.car = car;
})(ui || (ui = {}));
//# sourceMappingURL=car.js.map