module ui{
    export class background {
        private YDistance: number = 0;
        private bg1: Laya.Image;
        private bg2: Laya.Image;
        private isBottom: boolean = false;
        constructor() {
            this.bg1 = new Laya.Image('road.jpg');
            this.bg2 = new Laya.Image('road.jpg');

            this.bg1.size(Browser.width, Browser.height);
            this.bg2.size(Browser.width, Browser.height);
            this.bg2.pos(0, -Browser.height);

            Laya.stage.addChild(this.bg1);
            Laya.stage.addChild(this.bg2);
        }
        public render(): void {
            this.bg1.pos(0, this.YDistance);
            this.bg2.pos(0, -Browser.height + this.YDistance);
            if(this.isBottom){
                this.YDistance = 0;
                this.bg1.pos(0, this.YDistance);
                this.bg2.pos(0, -Browser.height + this.YDistance);
                this.isBottom = false;
            }
        }
        public update(): void {
            const SPEED = 30;
            this.YDistance += SPEED;
            if((this.YDistance + SPEED) >= Browser.height){
                this.isBottom = true;
            }
            this.render();
        }
    }
}