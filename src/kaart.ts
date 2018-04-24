module combinedtraders {
    export class Kaart {

        private _game: Phaser.Game;
        private _kaart: Phaser.Image;
        private _darkOverlay: Phaser.Graphics;
        private _tween: Phaser.Tween;

        constructor(game: Phaser.Game) {
            this._game = game;
            this._kaart = this._game.add.image(0, 0, "kaart");
            this._kaart.anchor.set(0.5, 0.5);
            this._kaart.position.set(this._game.width / 2, this._game.height / 2);
            this._darkOverlay = this._game.add.graphics(0, 0);

            this._darkOverlay.beginFill(0x000000, 1);
            this._darkOverlay.drawRect(0, 0, this._game.width, this._game.height);
            this._darkOverlay.endFill();
        }

        public SetTimeHour(uur: number,tweenDuration:number) {
            if (this._tween) {
                this._tween.stop();
                this._game.tweens.remove(this._tween);
                this._tween = null;
            }

            this._tween = this._game.add.tween(this._darkOverlay);
            this._tween.to({alpha: this.calculateAlpha(uur) * 0.8}, tweenDuration, Phaser.Easing.Linear.None, true);
        }

        private calculateAlpha(uur: number): number {
            let alpha: number = 0;

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
        }
    }
}