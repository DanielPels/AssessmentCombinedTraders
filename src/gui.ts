module combinedtraders {
    export class Gui {

        private _game: Phaser.Game;
        private _clock: Phaser.Text;

        private _timestepText: Phaser.Text;
        private _timeDirectionText: Phaser.Text;

        public onPause: Phaser.Signal;
        public onResume: Phaser.Signal;
        public onReverse: Phaser.Signal;
        public onForward: Phaser.Signal;
        public onIncreaseSpeed: Phaser.Signal;
        public onDecreaseSpeed: Phaser.Signal;

        private _pause: Phaser.Button;
        private _resume: Phaser.Button;
        private _left: Phaser.Button;
        private _right: Phaser.Button;
        private _up: Phaser.Button;
        private _down: Phaser.Button;

        constructor(game: Phaser.Game) {
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


            this._pause = this._game.add.button(10 + 50, 10, "pause", () => {
                this.onPause.dispatch();
            }, this);

            this._resume = this._game.add.button(50 * 2 + 10, 10, "resume", () => {
                this.onResume.dispatch();
            }, this);

            this._left = this._game.add.button(50 * 3 + 10, 10, "left", () => {
                this.onReverse.dispatch();
            }, this);
            this._left.scale.set(0.5);

            this._right = this._game.add.button(50 * 4 + 10, 10, "right", () => {
                this.onForward.dispatch();
            }, this);
            this._right.scale.set(0.5);

            this._up = this._game.add.button(50 * 5 + 10, 10, "up", () => {
                this.onIncreaseSpeed.dispatch();
            }, this);
            this._up.scale.set(0.5);

            this._down = this._game.add.button(50 * 6 + 10, 10, "down", () => {
                this.onDecreaseSpeed.dispatch();
            }, this);
            this._down.scale.set(0.5);

        }

        public SetClock(datum: string, uur: number) {
            this._clock.text = datum + " - " + uur.toString() + ":00";
        }

        public SetTimeStep(step: number) {
            this._timestepText.text = "Step speed: " + step.toString();
        }

        public SetTimeDirectionPaused() {
            this._timeDirectionText.text = "Time moving: paused"
        }

        public SetTimeDirectionForward() {
            this._timeDirectionText.text = "Time moving: forward"
        }

        public SetTimeDirectionReverse() {
            this._timeDirectionText.text = "Time moving: backwards"
        }
    }
}