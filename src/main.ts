/// <reference path="../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />/
module combinedtraders {

    export interface VerbruikDataInterface {
        Datum: string,
        EAN: string,
        Eenheid: string,
        Uur: number,
        Verbruik: number
    }

    export interface TemperatuurDataInterface {
        Datum: string,
        Temperatuur: number,
        Uur: number,
        stn: number
    }

    //entry point
    export class Entry {
        constructor() {
            //create Phaser canvas
            let game = new Phaser.Game(800, 600, Phaser.AUTO, 'content');
            game.state.add("main", Main);
            game.state.start("main");
        }
    }

    export class Main extends Phaser.State {
        //helper tool for canvas resize
        private _screen: screen;
        //map that centers on the screen and can add a dark overlay depending on time.
        private _kaart: Kaart;
        //helper tool for the pasing of time
        private _timeline: Timeline;
        //helper tool to get data of temperature at date and hour
        private _temperatuur: Temperatuur;
        //simple gui to control the timeline
        private _gui: Gui;

        //dots on the map that represent buildings that are monitored
        private _kantoor: Pand;
        private _apartement: Pand;

        //increment steps for the update timeout
        private _timeoutStep: number = 5;
        //starting update timeout.
        private _timeoutMax: number = 100;
        //time waited
        private _timeoutTime: number = 0;

        //track if paused
        private _paused: boolean = false;
        //track direction of time
        private _timeForward: boolean = true;

        public init() {
            //helper tool for resizing of canvas
            this._screen = new screen(this.game, ROTATION.BOTH, true);
        }

        public preload() {
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
        }

        public create() {
            //create a timeline
            this._timeline = new Timeline(new Date(2017, 0, 1, 1), new Date(2017, 11, 31, 24));
            //create temperature tool(gets json file from cache)
            this._temperatuur = new Temperatuur(this.game.cache.getJSON("temperatuur"));

            //create map and setup points
            this._kaart = new Kaart(this.game);

            //center w and center h of the screen.
            let cw = this.game.width / 2;
            let ch = this.game.height / 2;

            //create buildings on the map
            this._kantoor = new Pand(this.game, cw - 100, ch, this.game.cache.getJSON("871687140022xxxxxx"), this.game.cache.getJSON("871685920001xxxxxx"));
            this._apartement = new Pand(this.game, cw + 50, ch + 100, this.game.cache.getJSON("871687140015xxxxxx"), this.game.cache.getJSON("871685900002xxxxxx"));


            //create gui
            this._gui = new Gui(this.game);

            //hook callbacks from gui to do something use full
            this._gui.onDecreaseSpeed.add(() => {
                this._timeoutMax -= this._timeoutStep;
                if (this._timeoutMax < this._timeoutStep) {
                    this._timeoutMax = this._timeoutStep;
                }
            });

            this._gui.onIncreaseSpeed.add(() => {
                this._timeoutMax += this._timeoutStep;
            });

            this._gui.onForward.add(() => {
                this._timeForward = true;
            });

            this._gui.onReverse.add(() => {
                this._timeForward = false;
            });

            this._gui.onPause.add(() => {
                this._paused = true;
            });

            this._gui.onResume.add(() => {
                this._paused = false;
            })
        }

        public update() {
            //if paused quit update
            if (this._paused) {
                //set paused time direction in gui
                this._gui.SetTimeDirectionPaused();
                return;
            }

            //update time directio in gui
            if (this._timeForward) {
                this._gui.SetTimeDirectionForward()
            } else {
                this._gui.SetTimeDirectionReverse();
            }

            //update time step in gui
            this._gui.SetTimeStep(this._timeoutMax);

            //wait for timeout time to reach zero
            if (this._timeoutTime > 0) {
                //subtract waited milliseconds
                this._timeoutTime -= this.game.time.elapsedMS;
                return
            }
            //reset time
            this._timeoutTime = this._timeoutMax;

            //advance the timeline +1 hour
            this._timeline.Update(this._timeForward);

            //get hour, date and temperature
            let uur: number = this._timeline.GetUur();
            let datum: string = this._timeline.GetDatum();
            let temperatuur: number = this._temperatuur.GetTemperatuur(uur, datum);

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
        }
    }
}