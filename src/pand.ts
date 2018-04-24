module combinedtraders {
    export class Pand {

        private _game: Phaser.Game;

        private _dot: Phaser.Graphics;
        private _gasBar: Phaser.Graphics;
        private _elektraBar: Phaser.Graphics;
        private _temperatuurText: Phaser.Text;

        private _gasData: VerbruikDataInterface[];
        private _elektraData: VerbruikDataInterface[];

        private _barMaxPixelSize: number = 20;

        private _datum: string;
        private _uur: number;

        constructor(game: Phaser.Game, x, y: number, gas: VerbruikDataInterface[], elektra: VerbruikDataInterface[]) {

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

        public SetUur(uur: number) {
            this._uur = uur;
            this.renderData();
        }

        public SetDatum(datum: string) {
            this._datum = datum;
            this.renderData();
        }

        private renderData() {
            let gas: VerbruikDataInterface = null;
            for (let i = 0, len = this._gasData.length; i < len; i++) {
                if (this._gasData[i].Datum === this._datum && this._gasData[i].Uur === this._uur) {
                    gas = this._gasData[i];
                    break;
                }
            }

            let elektra: VerbruikDataInterface = null;
            for (let i = 0, len = this._elektraData.length; i < len; i++) {
                if (this._elektraData[i].Datum === this._datum && this._elektraData[i].Uur === this._uur) {
                    elektra = this._elektraData[i];
                    break;
                }
            }


            //check if either gas or elektra is missing
            if (!gas || !elektra) {
                //its missing = hide this pand
                this.hidePand();
                return
            }
            this.showPand();

            this.drawGasBar(gas.Verbruik, this.GetHighestVerbruikOfDate(this._datum, this._gasData));
            this.drawElektraBar(elektra.Verbruik, this.GetHighestVerbruikOfDate(this._datum, this._elektraData));
        }

        //Get highest verbruik value of a certain date
        private GetHighestVerbruikOfDate(datum: string, data: VerbruikDataInterface[]): number {
            let hours: VerbruikDataInterface[] = [];
            data.forEach((value: VerbruikDataInterface) => {
                if (value.Datum === datum) {
                    hours.push(value);
                }
            });

            if (hours.length === 0) {
                return 0;
            }

            let highestVerbruik: number = hours[0].Verbruik;

            hours.forEach((value: VerbruikDataInterface) => {
                if (value.Verbruik > highestVerbruik) {
                    highestVerbruik = value.Verbruik
                }
            });

            return highestVerbruik;
        }

        public SetTemperatuur(t: number) {
            //check if temperature is not null
            if (!t) {
                return
            }
            this._temperatuurText.text = "\u00b0" + t.toString();
        }

        private drawGasBar(value: number, max: number) {
            this._gasBar.clear();
            this._gasBar.beginFill(0x00ff00);
            this._gasBar.drawRect(-5, 0, 10, ((value / max) * this._barMaxPixelSize) * -1);
            this._gasBar.endFill();
        }

        private drawElektraBar(value: number, max: number) {
            this._elektraBar.clear();
            this._elektraBar.beginFill(0xffff00);
            this._elektraBar.drawRect(-5, 0, 10, ((value / max) * this._barMaxPixelSize) * -1);
            this._elektraBar.endFill();
        }

        private hidePand() {
            this._dot.alpha = 0;
        }

        private showPand() {
            this._dot.alpha = 1;
        }
    }
}