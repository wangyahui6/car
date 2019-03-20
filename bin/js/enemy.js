var ui;
(function (ui) {
    var Browser = Laya.Browser;
    var LEFT_LIMIT = 20;
    var RIGHT_LIMIT = 24;
    class enemy {
        constructor(skin) {
            this.y = -120;
            this.x = 200;
            this.speed = 20;
            this.enemy = new Laya.Image(skin);
            this.enemy.scale(1.5, 1.5);
        }
        init(speed = 10, x = 200) {
            this.speed = speed;
            this.x = x;
            this.y = -120;
            this.enemy.pos(this.x, this.y);
            Laya.stage.addChild(this.enemy);
        }
        update(databus, hexo, category) {
            if (this.y > Browser.height + 20 || this.y < -120) {
                Laya.stage.removeChild(this.enemy);
                databus.removeEnemy(this, category);
            }
            this.y += hexo.speed - this.speed;
            this.enemy.pos(this.x, this.y);
        }
        moveToHit(hexo, direction) {
            const Speed = 8;
            const Distance = 180;
            const RIGHT_POSI_LIMIT = Browser.width - RIGHT_LIMIT - hexo.car.displayWidth;
            const LEFT_POSI_LIMIT = LEFT_LIMIT;
            let nextPos = this.x + Speed * direction;
            if (this.y >= hexo.car.y - 400 && Math.abs(this.initX - this.x) <= Distance) {
                if (nextPos >= LEFT_POSI_LIMIT && nextPos <= RIGHT_POSI_LIMIT) {
                    this.x = nextPos;
                }
                else if (nextPos < LEFT_POSI_LIMIT) {
                    this.x = LEFT_POSI_LIMIT;
                }
                else {
                    this.x = RIGHT_POSI_LIMIT;
                }
            }
        }
    }
    ui.enemy = enemy;
    class basicEnemy extends enemy {
        constructor() {
            super('car/purple.png');
        }
    }
    ui.basicEnemy = basicEnemy;
    class naughtyEnemy extends enemy {
        constructor() {
            super('car/blue.png');
            this.direction = 1;
        }
        init(speed = 10, x = 200) {
            this.initX = x;
            super.init(speed, x);
            let random = Math.floor(Math.random() * 2); // 随机获取0或者1
            if (random === 0) {
                this.direction = -1;
            }
        }
        update(databus, hexo) {
            super.moveToHit(hexo, this.direction);
            super.update(databus, hexo, 'naughty');
        }
    }
    ui.naughtyEnemy = naughtyEnemy;
    class evilEnemy extends enemy {
        constructor() {
            super('car/red.png');
        }
        init(speed = 10, x = 200) {
            this.initX = x;
            super.init(speed, x);
        }
        update(databus, hexo) {
            let direction = 1;
            if (this.initX > hexo.car.x) {
                direction = -1;
            }
            super.moveToHit(hexo, direction);
            super.update(databus, hexo, 'evil');
        }
    }
    ui.evilEnemy = evilEnemy;
})(ui || (ui = {}));
//# sourceMappingURL=enemy.js.map