module ui{
    import Browser = Laya.Browser;
    export class enemy {
        private y: number = -120;
        private x: number = 200;
        private speed: number = 10;
        private enemy: Laya.Image; 
        constructor(){
            this.enemy = new Laya.Image();
        }
        public init(speed = 10, x = 200, category = 0): void {
            var carList = ['car1', 'car3', 'car4'];
            this.enemy.skin = `car/${carList[category]}.png`;
            this.speed = speed;
            this.x = x;
            this.y = -120;
            this.enemy.pos(this.x, this.y);
            Laya.stage.addChild(this.enemy);
        }
        public update(databus): void {
            if(this.y > Browser.height + 20){
                Laya.stage.removeChild(this.enemy);
                databus.removeEnemy(this);
            }
            this.y += this.speed;

            this.enemy.pos(this.x, this.y);
        }
    }
}