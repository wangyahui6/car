module ui{
    import Browser = Laya.Browser;
    export class enemy {
        protected y: number = -120;
        protected x: number = 200;
        public speed: number = 20;
        public enemy: Laya.Image; 
        protected initX: number;
        
        constructor(skin){
            this.enemy = new Laya.Image(skin);
            this.enemy.scale(1.5, 1.5);
        }
        public init(speed = 10, x = 200): void {
            this.speed = speed;
            this.x = x;
            this.y = -120;
            this.enemy.pos(this.x, this.y);
            Laya.stage.addChild(this.enemy);
        }
        public update(databus, hexo, category): void {
            if(this.y > Browser.height + 20 || this.y < -120){
                Laya.stage.removeChild(this.enemy);
                databus.removeEnemy(this, category);
            }
            this.y += hexo.speed - this.speed;
            this.enemy.pos(this.x, this.y);
        }
        public moveToHit(hexo, direction){
            const Speed = 8;
            const Distance = 180;
            if(this.y >= hexo.car.y-400 && Math.abs(this.initX - this.x) <= Distance && (this.x + Speed) <= Browser.width){
                this.x += Speed * direction;
            }
        }
    }
    export class basicEnemy extends enemy{
        constructor() {
            super('car/purple.png');
        }
    }
    export class naughtyEnemy extends enemy{
        private direction: number = 1;
        constructor() {
            super('car/blue.png');
        }
        init(speed = 10, x = 200): void {
            this.initX = x;
            super.init(speed, x);
            let random = Math.floor(Math.random() * 2); // 随机获取0或者1
            if(random === 0){
                this.direction = -1;
            }
        }
        update(databus, hexo): void {
            super.moveToHit(hexo, this.direction);
            super.update(databus, hexo, 'naughty');
        }
    }
    export class evilEnemy extends enemy{
        constructor() {
            super('car/red.png');
        }
        init(speed = 10, x = 200): void {
            this.initX = x;
            super.init(speed, x);
        }
        update(databus, hexo): void {
            let direction:number = 1;
            if(this.initX > hexo.car.x){
                direction = -1;
            }
            super.moveToHit(hexo, direction);
            super.update(databus, hexo, 'evil');
        }
    }
}