"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointmentController_1 = require("../controllers/appointmentController");
var appointmentService_1 = require("../services/appointmentService");
var router = (0, express_1.Router)();
var appointmentController = new appointmentController_1.AppointmentController(new appointmentService_1.AppointmentService());
router.post('/add', appointmentController.addAppointment.bind(appointmentController));
router.get('/all', function (req, res) {
    return appointmentController.getAppointments(req, res);
});
router.get('/:id', appointmentController.getAppointmentById.bind(appointmentController));
router.post('/reschedule', appointmentController.rescheduleAppointment.bind(appointmentController));
exports.default = router;
