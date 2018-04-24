/// <reference path="../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />/

module combinedtraders {
    export enum ROTATION {
        PORTRAIT,
        LANDSCAPE,
        BOTH
    }

    export class screen {

        //privates
        private _game: Phaser.Game;
        private _size: Phaser.Point;
        private _scale: Phaser.Point;
        private _rotation: ROTATION;
        private _force: boolean;

        //screen check
        private _currentSize: Phaser.Point;
        private _previousSize: Phaser.Point;

        //publics
        public onResize: Phaser.Signal;

        //statics
        static instance: screen;

        /**
         *
         * @param game refference naar phaser
         * @param rotation de gewenste rotatie
         * @param force forceer de gewenste rotatie en negeer pauses
         */
        constructor(game: Phaser.Game, rotation: ROTATION, force: boolean) {
            //check of er een instance van bestaat
            if (screen.instance) {
                throw new Error("Error double instance of screen!");
            } else {
                //set dscreen instance
                screen.instance = this;
            }
            //set refferences en maak variable aan
            this._game = game;
            //signal voor als resize is
            this.onResize = new Phaser.Signal();
            this._rotation = rotation;
            this._force = force || false;

            this._size = new Phaser.Point(0, 0);
            this._scale = new Phaser.Point(0, 0);

            this._currentSize = new Phaser.Point(0, 0);
            this._previousSize = new Phaser.Point(0, 0);


            //set de _game scale
            this._game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

            //hook een eventlistener aan _game resize
            this._game.scale.setResizeCallback(this.screenUpdated, this);

            //align the de _game goed
            this._game.scale.pageAlignVertically = true;
            this._game.scale.pageAlignHorizontally = true;

            this.screenUpdated();
        }

        get size(): Phaser.Point {
            return this._size;
        }

        get scale(): Phaser.Point {
            return this._scale;
        }

        get rotation(): ROTATION {
            if (this._rotation === ROTATION.BOTH) {
                return this.getOrientation();
            } else {
                return this._rotation;
            }
        }

        /**
         * Callback als het scherm verandert
         */
        public screenUpdated() {
            this._currentSize.x = window.innerWidth;
            this._currentSize.y = window.innerHeight;
            //check of het scherm wel veranderd is
            if (Phaser.Point.equals(this._currentSize, this._previousSize)) {
                return;
            } else {
                this._previousSize.x = window.innerWidth;
                this._previousSize.y = window.innerHeight;
            }
            //reken nieuw schermgroote uit
            //this.calculateScreen(this._rotation);
            this.scaleCanvas();
            //set alle nieuwe sizes en scales
            this._game.scale.setGameSize(this._size.x, this._size.y);
            this._game.scale.setUserScale(this._scale.x, this._scale.y);
            //refresh scherm
            this._game.scale.refresh();
            //dispatch screen resized
            this.onResize.dispatch();
        }

        /**
         * scale het canvas afhankelijk van welke rotatie gewenst is
         */
        private scaleCanvas() {
            if (this._rotation === ROTATION.BOTH) {
                if (this.getOrientation() === ROTATION.LANDSCAPE) {
                    this.scaleLandscape();
                }
                if (this.getOrientation() === ROTATION.PORTRAIT) {
                    this.scalePortrait();
                }
            } else {
                if (this._rotation === ROTATION.LANDSCAPE) {
                    this.scaleLandscape();
                }
                if (this._rotation === ROTATION.PORTRAIT) {
                    this.scalePortrait();
                }
            }
        }

        /**
         * scale het canvas naar landscape
         */
        private scaleLandscape() {
            //haal window width en heigth op
            let innerWidth = window.innerWidth;
            let innerHeigt = window.innerHeight;
            //set maximale resolutie
            let maxResolution = new Phaser.Point(1920, 1080);
            //maak variable aan om de nieuwe width, height, scale opteslaan
            let newWidth: number = 0, newHeigt: number = 0;
            let scaleX: number = 1, scaleY: number = 1;
            //basis resolutie(waar we van uitgaan)
            let baseResolution = new Phaser.Point(800, 600);


            if (this.getOrientation() === ROTATION.LANDSCAPE) { //landscape in landscape wat dus fullscreen moet worden
                newWidth = baseResolution.y * innerWidth / innerHeigt;
                newWidth = Math.min(newWidth, baseResolution.y * maxResolution.x / maxResolution.y);
                newHeigt = baseResolution.y;

                newWidth = Math.ceil(newWidth);
                newHeigt = Math.ceil(newHeigt);

                scaleX = innerWidth / newWidth;
                scaleY = innerHeigt / newHeigt;
            } else { //niet landscape maak borders
                newWidth = 800;
                newHeigt = 600;

                scaleX = innerWidth / newWidth;
                scaleY = scaleX;
            }


            //set de local variable
            this._size.x = newWidth;
            this._size.y = newHeigt;
            this._scale.x = scaleX;
            this._scale.y = scaleY;
        }

        /**
         * Scale het canvas naar portrait
         */
        private scalePortrait() {
            //haal window width en heigth op
            let innerWidth = window.innerWidth;
            let innerHeigt = window.innerHeight;

            //set maximale resolutie
            let maxResolution = new Phaser.Point(1920, 1080);

            //maak variable aan om de nieuwe width, height, scale opteslaan
            let newWidth: number = 0, newHeigt: number = 0;
            let scaleX: number = 1, scaleY: number = 1;
            //set base width and heigth
            let baseResolution = new Phaser.Point(600, 800);
            //switch max resolution around
            maxResolution = new Phaser.Point(maxResolution.y, maxResolution.x);
            //check what type of rotation we have
            if (this.getOrientation() === ROTATION.LANDSCAPE) {
                //landscape in portrait mode dus teken borders
                newWidth = 600;
                newHeigt = 800;

                scaleY = innerHeigt / newHeigt;
                scaleX = scaleY;
            } else {
                //portrait in portrait mode wat we willen dus fullscreen
                newHeigt = (baseResolution.x * innerHeigt / innerWidth);
                newHeigt = Math.min(newHeigt, baseResolution.x / (maxResolution.x / maxResolution.y));
                newWidth = baseResolution.x;

                newWidth = Math.ceil(newWidth);
                newHeigt = Math.ceil(newHeigt);

                scaleX = innerWidth / newWidth;
                scaleY = innerHeigt / newHeigt;
            }

            //set de local variable
            this._size.x = newWidth;
            this._size.y = newHeigt;
            this._scale.x = scaleX;
            this._scale.y = scaleY;
        }

        /**
         * Haal de rotatie van de window op
         * @returns {Screen.ROTATION}
         */
        private getOrientation(): ROTATION {
            if (window.innerWidth > window.innerHeight) {
                return ROTATION.LANDSCAPE;
            } else {
                return ROTATION.PORTRAIT;
            }
        }

        /**
         * Check of de huidige orientatie het zelfde is als de gewenste orientatie
         * @returns {boolean}
         */
        public correctOrientation(): boolean {
            if (this._game.device.desktop) {
                return true;
            }
            if (this._force) {
                return true;
            }
            return this.getOrientation() === this.rotation;
        }
    }

}