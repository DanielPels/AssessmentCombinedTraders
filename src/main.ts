/// <reference path="../node_modules/phaser-ce/typescript/pixi.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/p2.d.ts" />
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts" />/
module combinedtraders {
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
        private _screen: screen;
        private _kaart: Phaser.Image;

        public init() {
            this._screen = new screen(this.game, ROTATION.BOTH, true);
        }

        public preload() {
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
        }

        public create() {
            //create map and setup points
            this._kaart = this.game.add.image(0, 0, "kaart");
            this._kaart.anchor.set(0.5, 0.5);
            this._kaart.position.set(this.game.width / 2, this.game.height / 2);
        }

        public update() {
            //loop trough timed
        }
    }
}