import { RepositoryFactory } from '../factories/repositoryFactory';
import { tryCatchHelper } from '../helpers/tryCatchHelper';
import { ProfessionalManagmentInterface } from '../interfaces/ProfessionalManagmentInterface';
import { AvailabilityInfo } from '../types/user';

export class ProfessionalManagmentService {
	private repository: ProfessionalManagmentInterface;

	constructor() {
		this.repository = RepositoryFactory.getRepository('professionalManagment');
	}

	async addPsychologistToInstitution(
		institutionId: string,
		psychologistId: string
	) {
		return tryCatchHelper(async () => {
			if (!institutionId) throw new Error('Institution ID is missing');
			if (!psychologistId) throw new Error('Psychologist ID is missing');

			await this.repository.addPsychologistToInstitution(
				institutionId,
				psychologistId
			);
		});
	}

	async deletePsychologistFromInstitution(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('ID is missing');

			await this.repository.editPsychologistInstitutionStatus(id, false);
		});
	}

	async addAvailability(availabilityInfo: AvailabilityInfo) {
		return tryCatchHelper(async () => {
			if (!availabilityInfo) throw new Error('Availability info is missing');

			await this.repository.addAvailability(availabilityInfo);
		});
	}

	async editAvailability(id: number, availabilityInfo: AvailabilityInfo) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('ID is missing');
			if (!availabilityInfo) throw new Error('Availability info is missing');

			await this.repository.editAvailability(id, availabilityInfo);
		});
	}

	async deleteAvailability(id: number) {
		return tryCatchHelper(async () => {
			if (!id) throw new Error('ID is missing');
			await this.repository.deleteAvailability(id);
		});
	}
}
