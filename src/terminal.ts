module ui{
    import Browser = Laya.Browser;
    import Sprite = Laya.Sprite;
    export class terminal{
        public terminal: Sprite;
        private yDistance: number = 0;
        constructor() {
            this.terminal = new Sprite();
            //画直线
            this.terminal.loadImage('terminal.png');
            this.terminal.scale(1.5, 1);
        }
        public show(hexo){
            Laya.stage.addChild(this.terminal);
            this.yDistance += hexo.speed;
            this.terminal.pos(18, this.yDistance);
        }
    }
}