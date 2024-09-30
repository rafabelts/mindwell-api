"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
var User_1 = require("../models/User");
var Psychologist_1 = require("../models/Psychologist");
var Institution_1 = require("../models/Institution");
var UserFactory = /** @class */ (function () {
    function UserFactory() {
    }
    UserFactory.createUser = function (type, userData) {
        switch (type) {
            case 'user':
                if (isUser(userData)) {
                    return new User_1.UserModel(userData);
                }
                throw new Error('Invalid data provided for User');
            case 'psychologist':
                if (isPsychologist(userData)) {
                    return new Psychologist_1.PsychologistModel(userData);
                }
                throw new Error('Invalid data provided for Psychologist');
            case 'institution':
                if (isInstitution(userData)) {
                    return new Institution_1.InstitutionModel(userData);
                }
                throw new Error('Invalid data provided for Institution');
        }
    };
    return UserFactory;
}());
exports.UserFactory = UserFactory;
function isUser(userData) {
    return 'name' in userData && 'email' in userData;
}
function isPsychologist(userData) {
    return 'speciality' in userData;
}
function isInstitution(userData) {
    return 'address' in userData && !('speciality' in userData);
}
