"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionModel = void 0;
var InstitutionModel = /** @class */ (function () {
    function InstitutionModel(institutionData) {
        this.id = institutionData.id;
        this.address = institutionData.address;
        this.latitude = institutionData.latitude;
        this.length = institutionData.length;
    }
    InstitutionModel.prototype.getData = function () {
        return {
            id: this.id,
            address: this.address,
            latitude: this.latitude,
            length: this.length,
        };
    };
    return InstitutionModel;
}());
exports.InstitutionModel = InstitutionModel;
