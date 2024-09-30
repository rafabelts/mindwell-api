import { Router } from 'express';
import { ProfessionalManagmentService } from '../services/professionalManagmentService';
import { ProfessionalManagmentController } from '../controllers/professionalController';

const router = Router();

const professionalManagmentController = new ProfessionalManagmentController(
	new ProfessionalManagmentService()
);

router.post(
	'/institution/add',
	professionalManagmentController.addPsychologistToInstitution.bind(
		professionalManagmentController
	)
);

router.delete(
	'/institution/:id',
	professionalManagmentController.deletePsychologistFromInstitution.bind(
		professionalManagmentController
	)
);

router.post(
	'/schedule/add',
	professionalManagmentController.addSchedule.bind(
		professionalManagmentController
	)
);

router.post(
	'/schedule/edit',
	professionalManagmentController.editSchedule.bind(
		professionalManagmentController
	)
);

router.delete(
	'/schedule/:id',
	professionalManagmentController.deleteSchedule.bind(
		professionalManagmentController
	)
);

export default router;
