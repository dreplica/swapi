"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http_errors_1 = tslib_1.__importDefault(require("http-errors"));
var express_1 = tslib_1.__importDefault(require("express"));
var path_1 = tslib_1.__importDefault(require("path"));
var cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
var morgan_1 = tslib_1.__importDefault(require("morgan"));
var users_1 = tslib_1.__importDefault(require("./routes/users"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', users_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
