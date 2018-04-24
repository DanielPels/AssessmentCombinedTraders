var combinedtraders;
(function (combinedtraders) {
    var Gui = /** @class */ (function () {
        function Gui(game) {
            var _this = this;
            this._game = game;
            this._clock = this._game.add.text(60, 100, "0:00", null);
            this._clock.align = "left";
            this._clock.anchor.set(0, 0.5);
            this._clock.fontSize = 20;
            this._timestepText = this._game.add.text(60, 130, "100", null);
            this._timestepText.align = "left";
            this._timestepText.anchor.set(0, 0.5);
            this._timestepText.fontSize = 20;
            this._timeDirectionText = this._game.add.text(60, 160, ">>", null);
            this._timeDirectionText.align = "left";
            this._timeDirectionText.anchor.set(0, 0.5);
            this._timeDirectionText.fontSize = 20;
            this.onPause = new Phaser.Signal();
            this.onResume = new Phaser.Signal();
            this.onReverse = new Phaser.Signal();
            this.onForward = new Phaser.Signal();
            this.onIncreaseSpeed = new Phaser.Signal();
            this.onDecreaseSpeed = new Phaser.Signal();
            this._pause = this._game.add.button(10 + 50, 10, "pause", function () {
                _this.onPause.dispatch();
            }, this);
            this._resume = this._game.add.button(50 * 2 + 10, 10, "resume", function () {
                _this.onResume.dispatch();
            }, this);
            this._left = this._game.add.button(50 * 3 + 10, 10, "left", function () {
                _this.onReverse.dispatch();
            }, this);
            this._left.scale.set(0.5);
            this._right = this._game.add.button(50 * 4 + 10, 10, "right", function () {
                _this.onForward.dispatch();
            }, this);
            this._right.scale.set(0.5);
            this._up = this._game.add.button(50 * 5 + 10, 10, "up", function () {
                _this.onIncreaseSpeed.dispatch();
            }, this);
            this._up.scale.set(0.5);
            this._down = this._game.add.button(50 * 6 + 10, 10, "down", function () {
                _this.onDecreaseSpeed.dispatch();
            }, this);
            this._down.scale.set(0.5);
        }
        Gui.prototype.SetClock = function (datum, uur) {
            this._clock.text = datum + " - " + uur.toString() + ":00";
        };
        Gui.prototype.SetTimeStep = function (step) {
            this._timestepText.text = "Step speed: " + step.toString();
        };
        Gui.prototype.SetTimeDirectionPaused = function () {
            this._timeDirectionText.text = "Time moving: paused";
        };
        Gui.prototype.SetTimeDirectionForward = function () {
            this._timeDirectionText.text = "Time moving: forward";
        };
        Gui.prototype.SetTimeDirectionReverse = function () {
            this._timeDirectionText.text = "Time moving: backwards";
        };
        return Gui;
    }());
    combinedtraders.Gui = Gui;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=gui.js.map