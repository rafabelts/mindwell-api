"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalManagmentController = void 0;
var ProfessionalManagmentController = /** @class */ (function () {
    function ProfessionalManagmentController(professionalManagmentService) {
        this.professionalManagmentService = professionalManagmentService;
    }
    ProfessionalManagmentController.prototype.addPsychologistToInstitution = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, institutionId, psychologistId, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, institutionId = _a.institutionId, psychologistId = _a.psychologistId;
                        if (!institutionId)
                            return [2 /*return*/, res.status(400).json({ message: 'Institution ID is missing' })];
                        if (!psychologistId)
                            return [2 /*return*/, res.status(400).json({ message: 'Psychologist ID is missing' })];
                        return [4 /*yield*/, this.professionalManagmentService.addPsychologistToInstitution(institutionId, psychologistId)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res
                                .status(201)
                                .json({ message: 'Psychologist added to institution' })];
                    case 2:
                        error_1 = _b.sent();
                        res.status(400).json({ message: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfessionalManagmentController.prototype.deletePsychologistFromInstitution = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, parsedId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        if (!id)
                            return [2 /*return*/, res.status(400).json({ message: 'ID is missing' })];
                        parsedId = parseInt(id);
                        if (isNaN(parsedId))
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid ID format' })];
                        return [4 /*yield*/, this.professionalManagmentService.deletePsychologistFromInstitution(parsedId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res
                                .status(201)
                                .json({ message: 'Psychologist deleted from institution' })];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400).json({ message: error_2 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfessionalManagmentController.prototype.addSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var scheduleInfo, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        scheduleInfo = req.body.scheduleInfo;
                        if (!scheduleInfo)
                            return [2 /*return*/, res.status(400).json({ message: 'Schedule info is missing' })];
                        return [4 /*yield*/, this.professionalManagmentService.addAvailability({
                                id: null,
                                isActive: null,
                                day: scheduleInfo.day,
                                startTime: scheduleInfo.startTime,
                                endTime: scheduleInfo.endTime,
                                psychologistId: scheduleInfo.psychologistId,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Schedule added successfully',
                            })];
                    case 2:
                        error_3 = _a.sent();
                        res.status(400).json({ message: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfessionalManagmentController.prototype.editSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, scheduleInfo, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, scheduleInfo = _a.scheduleInfo;
                        if (!id)
                            return [2 /*return*/, res.status(400).json({ message: 'ID is missing' })];
                        if (!scheduleInfo)
                            return [2 /*return*/, res.status(400).json({ message: 'Schedule info is missing' })];
                        return [4 /*yield*/, this.professionalManagmentService.editAvailability(id, {
                                id: null,
                                isActive: null,
                                day: scheduleInfo.day,
                                startTime: scheduleInfo.startTime,
                                endTime: scheduleInfo.endTime,
                                psychologistId: scheduleInfo.psychologistId,
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Schedule edited successfully',
                            })];
                    case 2:
                        error_4 = _b.sent();
                        res.status(400).json({ message: error_4 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProfessionalManagmentController.prototype.deleteSchedule = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, parsedId, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        if (!id)
                            return [2 /*return*/, res.status(400).json({ message: 'ID is missing' })];
                        parsedId = parseInt(id);
                        if (isNaN(parsedId))
                            return [2 /*return*/, res.status(400).json({ message: 'Invalid ID format' })];
                        return [4 /*yield*/, this.professionalManagmentService.deleteAvailability(parsedId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.status(201).json({
                                message: 'Schedule deleted successfully',
                            })];
                    case 2:
                        error_5 = _a.sent();
                        res.status(400).json({ message: error_5 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProfessionalManagmentController;
}());
exports.ProfessionalManagmentController = ProfessionalManagmentController;
