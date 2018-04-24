var combinedtraders;
(function (combinedtraders) {
    var Timeline = /** @class */ (function () {
        function Timeline(start, end) {
            this._startDate = start;
            this._endDate = end;
            this._timeline = new Date(start.toISOString());
            console.log("Start date at: ", this._startDate.toISOString());
            console.log("End date at: ", this._endDate.toISOString());
        }
        Timeline.prototype.GetUur = function () {
            return this._timeline.getUTCHours();
        };
        Timeline.prototype.GetDatum = function () {
            var year = this._timeline.getFullYear().toString();
            var month = (this._timeline.getUTCMonth() + 1).toString();
            if ((this._timeline.getUTCMonth() + 1) < 10) {
                month = "0" + (this._timeline.getUTCMonth() + 1).toString();
            }
            var day = this._timeline.getUTCDate().toString();
            if (this._timeline.getUTCDate() < 10) {
                day = "0" + this._timeline.getUTCDate().toString();
            }
            return year + "-" + month + "-" + day;
        };
        Timeline.prototype.Update = function (forward) {
            var step = 1;
            if (!forward) {
                step = -1;
            }
            //check of de step mag
            this._timeline.setHours(this._timeline.getHours() + step);
        };
        return Timeline;
    }());
    combinedtraders.Timeline = Timeline;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=timeline.js.map