"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
const index_1 = require("./routes/index");
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use('/update', (req,res)=>{res.render("updating")});
app.use('/', index_1.indexRouter);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
exports.default = app;
