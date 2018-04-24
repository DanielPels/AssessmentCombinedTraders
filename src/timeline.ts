module combinedtraders {
    export class Timeline {

        private _startDate: Date;
        private _endDate: Date;

        private _timeline: Date;

        constructor(start: Date, end: Date) {
            this._startDate = start;
            this._endDate = end;

            this._timeline = new Date(start.toISOString());

            console.log("Start date at: ", this._startDate.toISOString());
            console.log("End date at: ", this._endDate.toISOString());
        }

        public GetUur() {
            return this._timeline.getUTCHours()
        }

        public GetDatum() {
            let year = this._timeline.getFullYear().toString();

            let month = (this._timeline.getUTCMonth() + 1).toString();
            //if month is below 10 add 0 in front
            if ((this._timeline.getUTCMonth() + 1) < 10) {
                month = "0" + (this._timeline.getUTCMonth() + 1).toString()
            }

            let day = this._timeline.getUTCDate().toString();
            //if day is below 10 add 0 in front
            if (this._timeline.getUTCDate() < 10) {
                day = "0" + this._timeline.getUTCDate().toString()
            }

            return year + "-" + month + "-" + day;
        }

        public Update(forward: boolean) {
            let step = 1;
            if (!forward) {
                step = -1;
            }
            //step through time
            this._timeline.setHours(this._timeline.getHours() + step);

            //if the time is outside of start and or end date, take a step back.
            if (this._timeline < this._startDate || this._timeline > this._endDate) {
                //reverse step
                this._timeline.setHours(this._timeline.getHours() + step * -1);
            }
        }
    }
}