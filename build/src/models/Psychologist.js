"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PsychologistModel = void 0;
var PsychologistModel = /** @class */ (function () {
    function PsychologistModel(psychologistData) {
        this.id = psychologistData.id;
        this.university = psychologistData.university;
        this.professionalId = psychologistData.professionalId; // Cedula del psicoloco
        this.speciality = psychologistData.speciality;
        this.description = psychologistData.description;
        this.score = psychologistData.score;
        this.address = psychologistData.address;
        this.schedule = psychologistData.schedule;
        this.institutions = psychologistData.institutions;
    }
    PsychologistModel.prototype.getData = function () {
        return {
            id: this.id,
            university: this.university,
            professionalId: this.professionalId,
            speciality: this.speciality,
            description: this.description,
            score: this.score,
            address: this.address,
            schedule: this.schedule,
            institutions: this.institutions,
        };
    };
    return PsychologistModel;
}());
exports.PsychologistModel = PsychologistModel;
