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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            //increment steps for the update timeout
            _this._timeoutStep = 5;
            //starting update timeout.
            _this._timeoutMax = 100;
            //time waited
            _this._timeoutTime = 0;
            //track if paused
            _this._paused = false;
            //track direction of time
            _this._timeForward = true;
            return _this;
        }
        Main.prototype.init = function () {
            //helper tool for resizing of canvas
            this._screen = new combinedtraders.screen(this.game, combinedtraders.ROTATION.BOTH, true);
        };
        Main.prototype.preload = function () {
            //make the background white
            this.game.stage.backgroundColor = 0xffffff;
            //Phaser will load all the data
            this.game.load.image("kaart", "img/nederlandkaart.png");
            this.game.load.image("down", "img/down.png");
            this.game.load.image("left", "img/left.png");
            this.game.load.image("pause", "img/pause.png");
            this.game.load.image("resume", "img/resume.png");
            this.game.load.image("right", "img/right.png");
            this.game.load.image("up", "img/up.png");
            this.game.load.json("871685900002xxxxxx", "data/871685900002xxxxxx.json");
            this.game.load.json("871685920001xxxxxx", "data/871685920001xxxxxx.json");
            this.game.load.json("871687140015xxxxxx", "data/871687140015xxxxxx.json");
            this.game.load.json("871687140022xxxxxx", "data/871687140022xxxxxx.json");
            this.game.load.json("temperatuur", "data/temperatuur.json");
            //Once everything is loaded Phaser will goto create function
        };
        Main.prototype.create = function () {
            var _this = this;
            //create a timeline
            this._timeline = new combinedtraders.Timeline(new Date(2017, 0, 1, 1), new Date(2017, 11, 31, 24));
            //create temperature tool(gets json file from cache)
            this._temperatuur = new combinedtraders.Temperatuur(this.game.cache.getJSON("temperatuur"));
            //create map and setup points
            this._kaart = new combinedtraders.Kaart(this.game);
            //center w and center h of the screen.
            var cw = this.game.width / 2;
            var ch = this.game.height / 2;
            //create buildings on the map
            this._kantoor = new combinedtraders.Pand(this.game, cw - 100, ch, this.game.cache.getJSON("871687140022xxxxxx"), this.game.cache.getJSON("871685920001xxxxxx"));
            this._apartement = new combinedtraders.Pand(this.game, cw + 50, ch + 100, this.game.cache.getJSON("871687140015xxxxxx"), this.game.cache.getJSON("871685900002xxxxxx"));
            //create gui
            this._gui = new combinedtraders.Gui(this.game);
            //hook callbacks from gui to do something use full
            this._gui.onDecreaseSpeed.add(function () {
                _this._timeoutMax -= _this._timeoutStep;
                if (_this._timeoutMax < _this._timeoutStep) {
                    _this._timeoutMax = _this._timeoutStep;
                }
            });
            this._gui.onIncreaseSpeed.add(function () {
                _this._timeoutMax += _this._timeoutStep;
            });
            this._gui.onForward.add(function () {
                _this._timeForward = true;
            });
            this._gui.onReverse.add(function () {
                _this._timeForward = false;
            });
            this._gui.onPause.add(function () {
                _this._paused = true;
            });
            this._gui.onResume.add(function () {
                _this._paused = false;
            });
        };
        Main.prototype.update = function () {
            //if paused quit update
            if (this._paused) {
                //set paused time direction in gui
                this._gui.SetTimeDirectionPaused();
                return;
            }
            //update time directio in gui
            if (this._timeForward) {
                this._gui.SetTimeDirectionForward();
            }
            else {
                this._gui.SetTimeDirectionReverse();
            }
            //update time step in gui
            this._gui.SetTimeStep(this._timeoutMax);
            //wait for timeout time to reach zero
            if (this._timeoutTime > 0) {
                //subtract waited milliseconds
                this._timeoutTime -= this.game.time.elapsedMS;
                return;
            }
            //reset time
            this._timeoutTime = this._timeoutMax;
            //advance the timeline +1 hour
            this._timeline.Update(this._timeForward);
            //get hour, date and temperature
            var uur = this._timeline.GetUur();
            var datum = this._timeline.GetDatum();
            var temperatuur = this._temperatuur.GetTemperatuur(uur, datum);
            //update buildings
            this._kantoor.SetTemperatuur(temperatuur);
            this._kantoor.SetDatum(datum);
            this._kantoor.SetUur(uur);
            this._apartement.SetTemperatuur(temperatuur);
            this._apartement.SetDatum(datum);
            this._apartement.SetUur(uur);
            //update map shadow depeding on time
            this._kaart.SetTimeHour(uur, this._timeoutMax);
            //update gui clock.
            this._gui.SetClock(datum, uur);
        };
        return Main;
    }(Phaser.State));
    combinedtraders.Main = Main;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=main.js.map