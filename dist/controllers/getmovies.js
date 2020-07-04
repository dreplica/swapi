"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.addComments = exports.getMovies = void 0;
var axios_1 = __importDefault(require("axios"));
var pgmodel_1 = __importDefault(require("../pgmodel"));
var db = pgmodel_1.default.db, sql = pgmodel_1.default.sql;
var getCommentCount = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.query(sql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT count(id) FROM comments WHERE id=", ""], ["SELECT count(id) FROM comments WHERE id=", ""])), id))];
            case 1:
                count = _a.sent();
                return [2 /*return*/, count[0].count];
        }
    });
}); };
var arrangeComments = function (comments) {
    var copyComment = JSON.parse(JSON.stringify(comments));
    return copyComment.sort(function (initial, later) {
        var initialDate = new Date(initial.created).getTime();
        var laterDate = new Date(later.created).getTime();
        if (initialDate - laterDate > 0) {
            return -1;
        }
        return 1;
    });
};
exports.getMovies = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, copyData, getSort, getComment, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get('https://swapi.dev/api/films')];
            case 1:
                data = (_a.sent()).data;
                copyData = JSON.parse(JSON.stringify(data.results));
                console.log(copyData);
                getSort = copyData.sort(function (initial, later) {
                    var initialDate = new Date(initial.release_date).getTime();
                    var laterDate = new Date(later.release_date).getTime();
                    if (initialDate - laterDate > 0) {
                        return 1;
                    }
                    return -1;
                });
                return [4 /*yield*/, getSort.reduce(function (acc, val) { return __awaiter(void 0, void 0, void 0, function () {
                        var count, accum, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, getCommentCount(val.episode_id)];
                                case 1:
                                    count = _b.sent();
                                    _a = {};
                                    return [4 /*yield*/, count];
                                case 2:
                                    accum = (_a.comment_count = _b.sent(),
                                        _a.episode_id = val.episode_id,
                                        _a.name = val.title,
                                        _a.opening_crawls = val.opening_crawl,
                                        _a);
                                    acc.then(function (res) {
                                        res.push(accum);
                                    });
                                    return [2 /*return*/, acc];
                            }
                        });
                    }); }, Promise.resolve([]))];
            case 2:
                getComment = _a.sent();
                return [2 /*return*/, { data: getComment }];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, { error: error_1.message }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addComments = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var comment_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query(sql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["INSERT INTO comments\n\t\tVALUES(", ",", ",", ",current_timestamp) \n\t\treturning *"], ["INSERT INTO comments\n\t\tVALUES(", ",", ",", ",current_timestamp) \n\t\treturning *"])), body.id, body.comment, body.ipAddress))];
            case 1:
                comment_1 = _a.sent();
                return [2 /*return*/, { data: comment_1 }];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, { error: "sorry couldn't add comment, please try again. Thanks" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getComments = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var comments, orderedComments, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.query(sql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["SELECT ipaddress,comment,id,created \n\t\tFROM comments\n\t\tWHERE id=", ""], ["SELECT ipaddress,comment,id,created \n\t\tFROM comments\n\t\tWHERE id=", ""])), id))];
            case 1:
                comments = _a.sent();
                orderedComments = arrangeComments(comments);
                return [2 /*return*/, { data: orderedComments }];
            case 2:
                error_3 = _a.sent();
                return [2 /*return*/, { error: 'sorry that comment was not found, try again or check connection' }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var templateObject_1, templateObject_2, templateObject_3;
