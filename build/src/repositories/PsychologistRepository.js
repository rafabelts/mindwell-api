"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.PsychologistRepository = void 0;
var db_1 = require("../config/db");
var schema_1 = require("../config/db/schema");
var tryCatchHelper_1 = require("../helpers/tryCatchHelper");
var drizzle_orm_1 = require("drizzle-orm");
var PsychologistRepository = /** @class */ (function () {
    function PsychologistRepository() {
    }
    PsychologistRepository.prototype.addUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, tryCatchHelper_1.tryCatchHelper)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var schedulePromises;
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, db_1.db.insert(schema_1.psychologist).values({
                                        id: userData.id,
                                        university: userData.university,
                                        speciality: userData.speciality,
                                        professionalId: userData.professionalId,
                                        description: userData.description,
                                        address: (_a = userData.address) !== null && _a !== void 0 ? _a : '',
                                    })];
                                case 1:
                                    _b.sent();
                                    if (!userData.schedule)
                                        throw new Error('Schedule is missing');
                                    schedulePromises = userData.schedule.map(function (scheduleInfo) {
                                        return db_1.db.insert(schema_1.scheduleAvailable).values({
                                            day: scheduleInfo.day,
                                            startTime: scheduleInfo.startTime,
                                            endTime: scheduleInfo.endTime,
                                            psychologistId: userData.id,
                                        });
                                    });
                                    return [4 /*yield*/, Promise.all(schedulePromises)];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    PsychologistRepository.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, (0, tryCatchHelper_1.tryCatchHelper)(function () { return __awaiter(_this, void 0, void 0, function () {
                        var psychologistData, schedule, institutions;
                        var _a, _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, db_1.db
                                        .select({
                                        id: schema_1.user.id,
                                        name: schema_1.user.name,
                                        email: schema_1.user.email,
                                        photoUrl: (_a = schema_1.user.photoUrl) !== null && _a !== void 0 ? _a : '',
                                        isActive: schema_1.user.isActive,
                                        isMember: schema_1.user.isMember,
                                        university: schema_1.psychologist.university,
                                        professionalId: schema_1.psychologist.professionalId,
                                        speciality: schema_1.psychologist.speciality,
                                        score: schema_1.psychologist.score,
                                        address: schema_1.psychologist.address,
                                        description: (_b = schema_1.psychologist.description) !== null && _b !== void 0 ? _b : '',
                                    })
                                        .from(schema_1.psychologist)
                                        .leftJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.user.id, schema_1.psychologist.id))
                                        .where((0, drizzle_orm_1.eq)(schema_1.user.id, id))];
                                case 1:
                                    psychologistData = _d.sent();
                                    if (psychologistData[0] && psychologistData[0].isActive !== true) {
                                        throw new Error('The account is no longer active');
                                    }
                                    return [4 /*yield*/, db_1.db.query.scheduleAvailable.findMany({
                                            where: function (model, _a) {
                                                var eq = _a.eq;
                                                return eq(model.psychologistId, id);
                                            },
                                        })];
                                case 2:
                                    schedule = _d.sent();
                                    return [4 /*yield*/, db_1.db
                                            .select({
                                            id: schema_1.user.id,
                                            name: schema_1.user.name,
                                            email: schema_1.user.email,
                                            photoUrl: (_c = schema_1.user.photoUrl) !== null && _c !== void 0 ? _c : '',
                                            isActive: schema_1.psychologistInstitution.isActive,
                                            isMember: schema_1.user.isMember,
                                            address: schema_1.institution.address,
                                            latitude: schema_1.institution.latitude,
                                            length: schema_1.institution.length,
                                        })
                                            .from(schema_1.psychologistInstitution)
                                            .leftJoin(schema_1.institution, (0, drizzle_orm_1.eq)(schema_1.psychologistInstitution.psychologistId, id))
                                            .leftJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.user.id, schema_1.institution.id))
                                            .where((0, drizzle_orm_1.eq)(schema_1.psychologistInstitution.psychologistId, id))];
                                case 3:
                                    institutions = _d.sent();
                                    return [2 /*return*/, __assign(__assign({}, psychologistData[0]), { schedule: schedule.filter(function (schedule) { return schedule.isActive === true; }), institutions: institutions.filter(function (institution) { return institution.isActive === true; }) })];
                            }
                        });
                    }); })];
            });
        });
    };
    PsychologistRepository.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var psychologistData, psychologistsWithExtraData;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            id: schema_1.user.id,
                            name: schema_1.user.name,
                            email: schema_1.user.email,
                            photoUrl: (_a = schema_1.user.photoUrl) !== null && _a !== void 0 ? _a : '',
                            isActive: schema_1.user.isActive,
                            isMember: schema_1.user.isMember,
                            university: schema_1.psychologist.university,
                            professionalId: schema_1.psychologist.professionalId,
                            speciality: schema_1.psychologist.speciality,
                            score: schema_1.psychologist.score,
                            address: schema_1.psychologist.address,
                            description: (_b = schema_1.psychologist.description) !== null && _b !== void 0 ? _b : '',
                        })
                            .from(schema_1.psychologist)
                            .leftJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.user.id, schema_1.psychologist.id))
                            .where((0, drizzle_orm_1.eq)(schema_1.user.isActive, true))];
                    case 1:
                        psychologistData = _c.sent();
                        return [4 /*yield*/, Promise.all(psychologistData.map(function (psychologist) { return __awaiter(_this, void 0, void 0, function () {
                                var schedule, institutions;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0: return [4 /*yield*/, db_1.db.query.scheduleAvailable.findMany({
                                                where: function (model, _a) {
                                                    var _b;
                                                    var eq = _a.eq;
                                                    return eq(model.psychologistId, (_b = psychologist.id) !== null && _b !== void 0 ? _b : '');
                                                },
                                            })];
                                        case 1:
                                            schedule = _c.sent();
                                            return [4 /*yield*/, db_1.db
                                                    .select({
                                                    id: schema_1.user.id,
                                                    name: schema_1.user.name,
                                                    email: schema_1.user.email,
                                                    photoUrl: (_a = schema_1.user.photoUrl) !== null && _a !== void 0 ? _a : '',
                                                    isActive: schema_1.psychologistInstitution.isActive,
                                                    isMember: schema_1.user.isMember,
                                                    address: schema_1.institution.address,
                                                    latitude: schema_1.institution.latitude,
                                                    length: schema_1.institution.length,
                                                })
                                                    .from(schema_1.psychologistInstitution)
                                                    .leftJoin(schema_1.institution, (0, drizzle_orm_1.eq)(schema_1.psychologistInstitution.psychologistId, (_b = psychologist.id) !== null && _b !== void 0 ? _b : ''))
                                                    .leftJoin(schema_1.user, (0, drizzle_orm_1.eq)(schema_1.user.id, schema_1.institution.id))];
                                        case 2:
                                            institutions = _c.sent();
                                            return [2 /*return*/, __assign(__assign({}, psychologist), { schedule: schedule.filter(function (schedule) { return schedule.isActive === true; }), institutions: institutions.filter(function (institution) { return institution.isActive === true; }) })];
                                    }
                                });
                            }); }))];
                    case 2:
                        psychologistsWithExtraData = _c.sent();
                        return [2 /*return*/, psychologistsWithExtraData];
                }
            });
        });
    };
    PsychologistRepository.prototype.updateUser = function (id, user) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    PsychologistRepository.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return PsychologistRepository;
}());
exports.PsychologistRepository = PsychologistRepository;
