var combinedtraders;
(function (combinedtraders) {
    var Temperatuur = /** @class */ (function () {
        function Temperatuur(data) {
            this._data = data;
        }
        Temperatuur.prototype.GetTemperatuur = function (uur, datum) {
            for (var i = 0, len = this._data.length; i < len; i++) {
                var t = this._data[i];
                if (t.Datum === datum && t.Uur === uur) {
                    return t.Temperatuur;
                }
            }
            return null;
        };
        return Temperatuur;
    }());
    combinedtraders.Temperatuur = Temperatuur;
})(combinedtraders || (combinedtraders = {}));
//# sourceMappingURL=temperatuur.js.map