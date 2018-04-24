var combinedtraders;
(function (combinedtraders) {
    var Kaart = /** @class */ (function () {
        function Kaart(game) {
            this._game = game;
            this._kaart = this._game.add.image(0, 0, "kaart");
            this._kaart.anchor.set(0.5, 0.5);
            this._kaart.position.set(this._game.width / 2, this._game.height / 2);
            this._darkOverlay = this._game.add.graphics(0, 0);
            this._darkOverlay.beginFill(0x000000, 1);
            this._darkOverlay.drawRect(0, 0, this._game.width, this._game.height);
            this._darkOverlay.endFill();
        }
        Kaart.prototype.SetTimeHour = function (uur, tweenDuration) {
            if (this._tween) {
                this._tween.stop();
                this._game.tweens.remove(this._tween);
                this._tween = null;
            }
            this._tween = this._game.add.tween(this._darkOverlay);
            this._tween.to({ alpha: this.calculateAlpha(uur) * 0.8 }, tweenDuration, Phaser.Easing.Linear.None, true);
        };
        Kaart.prototype.calculateAlpha = function (uur) {
            var alpha = 0;
            if (uur < 12) {
                alpha = 1 - (uur / 12);
                return alpha;
            }
            if (uur == 12) {
                return 0;
            }
            if (uur > 12) {
                alpha = ((uur - 12) / 12);
                return alpha;
            }
        };
        return Kaart;
    }());
    combinedtraders.Kaart = Kaart;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=kaart.js.map