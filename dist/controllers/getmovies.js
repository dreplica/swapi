"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovies = void 0;
var tslib_1 = require("tslib");
var movies_1 = require("./../types/movies");
var axios_1 = tslib_1.__importDefault(require("axios"));
exports.getMovies = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var data, getComment, error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get('https://swapi/api/films')];
            case 1:
                data = (_a.sent()).data;
                getComment = data.reduce(function (acc, val) {
                }, { initialAcc: movies_1.initialAcc });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
