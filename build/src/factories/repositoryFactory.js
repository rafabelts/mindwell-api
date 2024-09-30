"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
// Repositories
var appointmentRepository_1 = require("../repositories/appointmentRepository");
var chatRepository_1 = require("../repositories/chatRepository");
var institutionRepository_1 = require("../repositories/institutionRepository");
var professionalManagmentRepository_1 = require("../repositories/professionalManagmentRepository");
var psychologistRepository_1 = require("../repositories/psychologistRepository");
var reviewRepository_1 = require("../repositories/reviewRepository");
var userRepository_1 = require("../repositories/userRepository");
var RepositoryFactory = /** @class */ (function () {
    function RepositoryFactory() {
    }
    RepositoryFactory.getRepository = function (type) {
        switch (type) {
            case 'user':
                return new userRepository_1.UserRepository();
            case 'psychologist':
                return new psychologistRepository_1.PsychologistRepository();
            case 'institution':
                return new institutionRepository_1.InstitutionRepository();
            case 'appointment':
                return new appointmentRepository_1.AppointmentRepository();
            case 'review':
                return new reviewRepository_1.ReviewRepository();
            case 'professionalManagment':
                return new professionalManagmentRepository_1.ProfessionalManagmentRepository();
            case 'chat':
                return new chatRepository_1.ChatRepository();
            default:
                throw new Error('No repository found');
        }
    };
    return RepositoryFactory;
}());
exports.RepositoryFactory = RepositoryFactory;
