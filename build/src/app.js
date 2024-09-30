"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
var reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
var professionalManagmentRoutes_1 = __importDefault(require("./routes/professionalManagmentRoutes"));
var chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
var app = (0, express_1.default)();
var port = 8080;
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('<h1>Mindwell revivio</h1>');
});
app.use('/api/user', userRoutes_1.default);
app.use('/api/appointment', appointmentRoutes_1.default);
app.use('/api/review', reviewRoutes_1.default);
app.use('/api/manage', professionalManagmentRoutes_1.default);
app.use('/api/chat', chatRoutes_1.default);
app.listen(port, function () {
    console.log("listening at: http://localhost:".concat(port));
});
