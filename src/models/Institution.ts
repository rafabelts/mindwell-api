import { Institution } from '../types/user';

export class InstitutionModel {
	private id: string;
	private address: string;
	private latitude: string;
	private length: string;

	constructor(institutionData: Institution) {
		this.id = institutionData.id;
		this.address = institutionData.address;
		this.latitude = institutionData.latitude;
		this.length = institutionData.length;
	}

	getData(): Institution {
		return {
			id: this.id,
			address: this.address,
			latitude: this.latitude,
			length: this.length,
		};
	}
}
