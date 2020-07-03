"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (_, res) {
    res.status(200).send('Hello please check the github for documentations');
});
router.get('/movies', function (req, res) {
    res.status(200).send('Hello please check the github for documentations');
});
exports.default = router;
