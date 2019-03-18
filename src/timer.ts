module ui{
    import Browser = Laya.Browser;
    export class timer{
        public totalSeconds: number = 50;
        private txt: Laya.Text;
        private timeId: number;
        constructor() {
            this.txt = new Laya.Text(); 
            //设置文本内容
            this.txt.text = String(this.totalSeconds);  
            //设置文本颜色为白色，默认颜色为黑色
            this.txt.color = "#ffffff"; 
            this.txt.fontSize = 50;  
            //将文本内容添加到舞台 
            Laya.stage.addChild(this.txt);
            this.txt.pos(Browser.width - 120, Browser.height - 100);
        }
        public start() {
            this.timeId = setTimeout(() => {
                this.totalSeconds--;
                this.txt.text = String(this.totalSeconds);  
                if(this.totalSeconds){
                    this.start();
                }else{
                    clearTimeout(this.timeId);
                }
            }, 1000);
        }
        public stop(){
            clearTimeout(this.timeId);
        }
    }
}