var combinedtraders;
(function (combinedtraders) {
    var Pand = /** @class */ (function () {
        function Pand(game, x, y, gas, elektra) {
            this._barMaxPixelSize = 20;
            this._datum = "";
            this._uur = 0;
            this._game = game;
            this._gasData = gas;
            this._elektraData = elektra;
            this._dot = this._game.add.graphics(x, y);
            this._dot.beginFill(0x0000ff, 1);
            this._dot.drawCircle(0, 0, 20);
            this._dot.endFill();
            this._gasBar = this._game.add.graphics(0, 0);
            this._dot.addChild(this._gasBar);
            this._gasBar.position.set(-5, -10);
            this._elektraBar = this._game.add.graphics(0, 0);
            this._dot.addChild(this._elektraBar);
            this._elektraBar.position.set(5, -10);
            this._temperatuurText = this._game.add.text(0, 0, "0", null);
            this._temperatuurText.smoothed = true;
            this._temperatuurText.autoRound = true;
            this._temperatuurText.fill = "#7b29ff";
            this._temperatuurText.align = "left";
            this._temperatuurText.fontSize = 15;
            this._temperatuurText.anchor.set(0, 0.5);
            this._dot.addChild(this._temperatuurText);
            this._temperatuurText.position.set(10, 0);
            this.SetTemperatuur(10.3);
            this.drawGasBar(1, 1);
            this.drawElektraBar(1, 2);
        }
        Pand.prototype.SetUur = function (uur) {
            this._uur = uur;
            this.renderData();
        };
        Pand.prototype.SetDatum = function (datum) {
            this._datum = datum;
            this.renderData();
        };
        Pand.prototype.renderData = function () {
            var gas = null;
            for (var i = 0, len = this._gasData.length; i < len; i++) {
                if (this._gasData[i].Datum === this._datum && this._gasData[i].Uur === this._uur) {
                    gas = this._gasData[i];
                    break;
                }
            }
            var elektra = null;
            for (var i = 0, len = this._elektraData.length; i < len; i++) {
                if (this._elektraData[i].Datum === this._datum && this._elektraData[i].Uur === this._uur) {
                    elektra = this._elektraData[i];
                    break;
                }
            }
            //check if either gas or elektra is missing
            if (!gas || !elektra) {
                //its missing = hide this pand
                this.hidePand();
                return;
            }
            this.showPand();
            this.drawGasBar(gas.Verbruik, this.GetHighestVerbruikOfDate(this._datum, this._gasData));
            this.drawElektraBar(elektra.Verbruik, this.GetHighestVerbruikOfDate(this._datum, this._elektraData));
        };
        //Get highest verbruik value of a certain date
        Pand.prototype.GetHighestVerbruikOfDate = function (datum, data) {
            var hours = [];
            data.forEach(function (value) {
                if (value.Datum === datum) {
                    hours.push(value);
                }
            });
            if (hours.length === 0) {
                return 0;
            }
            var highestVerbruik = hours[0].Verbruik;
            hours.forEach(function (value) {
                if (value.Verbruik > highestVerbruik) {
                    highestVerbruik = value.Verbruik;
                }
            });
            return highestVerbruik;
        };
        Pand.prototype.SetTemperatuur = function (t) {
            //check if temperature is not null
            if (!t) {
                return;
            }
            this._temperatuurText.text = "\u00b0" + t.toString();
        };
        Pand.prototype.drawGasBar = function (value, max) {
            this._gasBar.clear();
            this._gasBar.beginFill(0x00ff00);
            this._gasBar.drawRect(-5, 0, 10, ((value / max) * this._barMaxPixelSize) * -1);
            this._gasBar.endFill();
        };
        Pand.prototype.drawElektraBar = function (value, max) {
            this._elektraBar.clear();
            this._elektraBar.beginFill(0xffff00);
            this._elektraBar.drawRect(-5, 0, 10, ((value / max) * this._barMaxPixelSize) * -1);
            this._elektraBar.endFill();
        };
        Pand.prototype.hidePand = function () {
            this._dot.alpha = 0;
        };
        Pand.prototype.showPand = function () {
            this._dot.alpha = 1;
        };
        return Pand;
    }());
    combinedtraders.Pand = Pand;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=pand.js.map