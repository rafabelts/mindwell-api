"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.chat = exports.review = exports.appointment = exports.emotionalRecord = exports.psychologistInstitution = exports.institution = exports.scheduleAvailable = exports.psychologist = exports.member = exports.user = void 0;
var sqlite_core_1 = require("drizzle-orm/sqlite-core");
var drizzle_orm_1 = require("drizzle-orm");
/*
    las tablas se crean como objetos para posteriormente acceder a ellas como queries

    para crear la tabla utilizamos el metodo sqliteTable el cual recibe dos parametro nombre de la tabla y el
    objeto con los campos que tendra:

    shit: typeOfShit('name') y metodo para poner valor por default, si es llave primaria, no nulo, referencia a algun otro
    atributo (FK), etc, etc
*/
exports.user = (0, sqlite_core_1.sqliteTable)('User', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('name').notNull(),
    email: (0, sqlite_core_1.text)('email').notNull().unique(),
    photoUrl: (0, sqlite_core_1.text)('photo_url'),
    isActive: (0, sqlite_core_1.integer)('is_active', { mode: 'boolean' }).default(true).notNull(),
    isMember: (0, sqlite_core_1.integer)('is_active', { mode: 'boolean' }).notNull(),
});
exports.member = (0, sqlite_core_1.sqliteTable)('Member', {
    id: (0, sqlite_core_1.text)('id')
        .primaryKey()
        .references(function () { return exports.user.id; })
        .notNull(),
    suscriptionStartTime: (0, sqlite_core_1.text)('suscription_start_time')
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["(CURRENT_TIMESTAMP)"], ["(CURRENT_TIMESTAMP)"]))))
        .notNull(),
    suscriptionEndTime: (0, sqlite_core_1.text)('suscription_end_time'),
});
exports.psychologist = (0, sqlite_core_1.sqliteTable)('Psychologist', {
    id: (0, sqlite_core_1.text)('id')
        .primaryKey()
        .references(function () { return exports.user.id; })
        .notNull(),
    university: (0, sqlite_core_1.text)('university').notNull(),
    professionalId: (0, sqlite_core_1.text)('professional_id').notNull().unique(),
    speciality: (0, sqlite_core_1.text)('speciality').notNull(),
    description: (0, sqlite_core_1.text)('description').notNull(),
    score: (0, sqlite_core_1.integer)('score').notNull().default(5),
    address: (0, sqlite_core_1.text)('address'),
});
exports.scheduleAvailable = (0, sqlite_core_1.sqliteTable)('ScheduleAvailable', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    day: (0, sqlite_core_1.text)('day').notNull(),
    startTime: (0, sqlite_core_1.text)('start_time').notNull(),
    endTime: (0, sqlite_core_1.text)('end_time').notNull(),
    isActive: (0, sqlite_core_1.integer)('is_active', { mode: 'boolean' }).default(true).notNull(),
    psychologistId: (0, sqlite_core_1.text)('psychologist_id')
        .references(function () { return exports.psychologist.id; })
        .notNull(),
});
exports.institution = (0, sqlite_core_1.sqliteTable)('Institution', {
    id: (0, sqlite_core_1.text)('id')
        .primaryKey()
        .references(function () { return exports.user.id; })
        .notNull(),
    address: (0, sqlite_core_1.text)('address').notNull(),
    latitude: (0, sqlite_core_1.text)('latitude').notNull(),
    length: (0, sqlite_core_1.text)('length').notNull(),
});
exports.psychologistInstitution = (0, sqlite_core_1.sqliteTable)('PsychologistInstitution', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    psychologistId: (0, sqlite_core_1.text)('psychologist_id')
        .references(function () { return exports.psychologist.id; })
        .notNull(),
    institutionId: (0, sqlite_core_1.text)('institution_id')
        .references(function () { return exports.institution.id; })
        .notNull(),
    isActive: (0, sqlite_core_1.integer)('is_active', { mode: 'boolean' }).default(true).notNull(),
});
exports.emotionalRecord = (0, sqlite_core_1.sqliteTable)('EmotionalRecord', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    date: (0, sqlite_core_1.text)('date')
        .default((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["(CURRENT_TIMESTAMP)"], ["(CURRENT_TIMESTAMP)"]))))
        .notNull(),
    emotion: (0, sqlite_core_1.text)('emotion').notNull(),
    userId: (0, sqlite_core_1.text)('user_id')
        .references(function () { return exports.user.id; })
        .notNull(),
});
exports.appointment = (0, sqlite_core_1.sqliteTable)('Appointment', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    date: (0, sqlite_core_1.text)('date').notNull(),
    isActive: (0, sqlite_core_1.integer)('is_active', { mode: 'boolean' }).default(true).notNull(),
    originalAppointmentId: (0, sqlite_core_1.integer)('original_appointment_id'),
    userId: (0, sqlite_core_1.text)('user_id')
        .references(function () { return exports.user.id; })
        .notNull(),
    psychologistId: (0, sqlite_core_1.text)('psychologist_id')
        .references(function () { return exports.psychologist.id; })
        .notNull(),
});
exports.review = (0, sqlite_core_1.sqliteTable)('Review', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    score: (0, sqlite_core_1.integer)('score').notNull(),
    comment: (0, sqlite_core_1.text)('comment'),
    appointmentId: (0, sqlite_core_1.integer)('appointment_id')
        .references(function () { return exports.appointment.id; })
        .notNull(),
});
exports.chat = (0, sqlite_core_1.sqliteTable)('Chat', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    userId: (0, sqlite_core_1.text)('user_id').references(function () { return exports.user.id; }),
    psychologistId: (0, sqlite_core_1.text)('psychologist_id')
        .references(function () { return exports.psychologist.id; })
        .notNull(),
});
exports.message = (0, sqlite_core_1.sqliteTable)('Message', {
    id: (0, sqlite_core_1.integer)('id').primaryKey().notNull(),
    content: (0, sqlite_core_1.text)('content').notNull(),
    date: (0, sqlite_core_1.text)('date')
        .default((0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["(CURRENT_TIMESTAMP)"], ["(CURRENT_TIMESTAMP)"]))))
        .notNull(),
    chatId: (0, sqlite_core_1.integer)('chat_id')
        .references(function () { return exports.chat.id; })
        .notNull(),
    senderId: (0, sqlite_core_1.text)('sender_id')
        .references(function () { return exports.user.id; })
        .notNull(),
});
var templateObject_1, templateObject_2, templateObject_3;
