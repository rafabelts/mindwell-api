import { CanBeNull } from '.';

export type Review = {
	id: CanBeNull<number>;
	score: number;
	comment: CanBeNull<string>;
	appointmentId: number;
};
