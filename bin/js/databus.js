var ui;
(function (ui) {
    var Pool = Laya.Pool;
    var instance;
    var databus = /** @class */ (function () {
        function databus() {
            this.enemys = [];
            this.frame = 0;
            if (instance)
                return instance;
            instance = this;
            this.reset();
        }
        databus.prototype.reset = function () {
            this.enemys = [];
        };
        databus.prototype.removeEnemy = function () {
            var enemy = this.enemys.shift();
            Pool.recover('enemy', enemy);
        };
        return databus;
    }());
    ui.databus = databus;
})(ui || (ui = {}));
//# sourceMappingURL=databus.js.map