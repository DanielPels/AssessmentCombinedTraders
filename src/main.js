var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/// <reference path="../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />/
var combinedtraders;
(function (combinedtraders) {
    //entry point
    var Entry = /** @class */ (function () {
        function Entry() {
            //create Phaser canvas
            var game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
            game.state.add("main", Main);
            game.state.start("main");
        }
        return Entry;
    }());
    combinedtraders.Entry = Entry;
    var Main = /** @class */ (function (_super) {
        __extends(Main, _super);
        function Main() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Main.prototype.init = function () {
            this._screen = new combinedtraders.screen(this.game, combinedtraders.ROTATION.BOTH, true);
        };
        Main.prototype.preload = function () {
            //make the background white
            this.game.stage.backgroundColor = 0xffffff;
            //Phaser will load all the data
            this.game.load.image("kaart", "img/nederlandkaart.png");
            this.game.load.json("871685900002xxxxxx", "data/871685900002xxxxxx.json");
            this.game.load.json("871685920001xxxxxx", "data/871685920001xxxxxx.json");
            this.game.load.json("871687140015xxxxxx", "data/871687140015xxxxxx.json");
            this.game.load.json("871687140022xxxxxx", "data/871687140022xxxxxx.json");
            this.game.load.json("temperatuur", "data/temperatuur.json");
            //Once everything is loaded Phaser will goto create function
        };
        Main.prototype.create = function () {
            this._timeline = new combinedtraders.Timeline(new Date(2017, 0, 1, 1), new Date(2017, 11, 31, 24));
            this._temperatuur = new combinedtraders.Temperatuur(this.game.cache.getJSON("temperatuur"));
            //create map and setup points
            this._kaart = this.game.add.image(0, 0, "kaart");
            this._kaart.anchor.set(0.5, 0.5);
            this._kaart.position.set(this.game.width / 2, this.game.height / 2);
        };
        Main.prototype.update = function () {
            //loop trough time
        };
        return Main;
    }(Phaser.State));
    combinedtraders.Main = Main;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=main.js.map