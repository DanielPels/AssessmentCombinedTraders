module combinedtraders {
    export class Temperatuur {

        private _data: TemperatuurDataInterface[];

        constructor(data: TemperatuurDataInterface[]) {
            this._data = data;
        }

        public GetTemperatuur(uur: number, datum: string): number {
            for (let i = 0, len = this._data.length; i < len; i++) {
                let t = this._data[i];
                if (t.Datum === datum && t.Uur === uur) {
                    return t.Temperatuur
                }
            }
            return null;
        }
    }
}