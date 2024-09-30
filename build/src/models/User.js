"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var UserModel = /** @class */ (function () {
    function UserModel(userData) {
        (this.id = userData.id), (this.name = userData.name);
        this.email = userData.email;
        this.photoUrl = userData.photoUrl;
        this.isActive = userData.isActive;
        this.isMember = userData.isMember;
    }
    UserModel.prototype.getData = function () {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            photoUrl: this.photoUrl,
            isActive: this.isActive,
            isMember: this.isMember,
        };
    };
    return UserModel;
}());
exports.UserModel = UserModel;
