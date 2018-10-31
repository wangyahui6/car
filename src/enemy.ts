module ui{
    import Browser = Laya.Browser;
    export class enemy {
        protected y: number = -120;
        protected x: number = 200;
        protected speed: number = 10;
        protected enemy: Laya.Image; 
        constructor(skin){
            this.enemy = new Laya.Image(skin);
        }
        public init(speed = 10, x = 200): void {
            this.speed = speed;
            this.x = x;
            this.y = -120;
            this.enemy.pos(this.x, this.y);
            Laya.stage.addChild(this.enemy);
        }
        public update(databus, category='basic'): void {
            if(this.y > Browser.height + 20){
                Laya.stage.removeChild(this.enemy);
                databus.removeEnemy(this, category);
            }

            this.y += this.speed;
            this.enemy.pos(this.x, this.y);
        }
    }
    export class basicEnemy extends enemy{
        constructor() {
            super('car/car4.png');
        }
    }
    export class naughtyEnemy extends enemy{
        private initX: number;
        constructor() {
            super('car/car1.png');
        }
        init(speed = 10, x = 200): void {
            this.initX = x;
            super.init(speed, x);
        }
        update(databus, hexo): void {
            let direction:number = -1;
            if(this.y >= hexo.car.y-200 && Math.abs(this.initX - this.x) <= 80 && (this.x + 10) <= Browser.width){
                this.x += 5;
            }
            super.update(databus, 'naughty');
        }
    }
    export class evilEnemy extends enemy{
        private initX: number;
        constructor() {
            super('car/car3.png');
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
            if(this.y >= hexo.car.y-200 && Math.abs(this.initX - this.x) <= 80 && (this.x + 5) <= Browser.width){
                this.x += 5 * direction;
            }
            super.update(databus, 'evil');
        }
    }
}