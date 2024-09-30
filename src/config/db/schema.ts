import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { char } from 'drizzle-orm/mysql-core';
import { log } from 'console';

/*
    las tablas se crean como objetos para posteriormente acceder a ellas como queries

    para crear la tabla utilizamos el metodo sqliteTable el cual recibe dos parametro nombre de la tabla y el
    objeto con los campos que tendra:

    shit: typeOfShit('name') y metodo para poner valor por default, si es llave primaria, no nulo, referencia a algun otro
    atributo (FK), etc, etc
*/

export const user = sqliteTable('User', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	photoUrl: text('photo_url'),
	isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
	isMember: integer('is_active', { mode: 'boolean' }).notNull(),
});

export const member = sqliteTable('Member', {
	id: text('id')
		.primaryKey()
		.references(() => user.id)
		.notNull(),
	suscriptionStartTime: text('suscription_start_time')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	suscriptionEndTime: text('suscription_end_time'),
});

export const psychologist = sqliteTable('Psychologist', {
	id: text('id')
		.primaryKey()
		.references(() => user.id)
		.notNull(),
	university: text('university').notNull(),
	professionalId: text('professional_id').notNull().unique(),
	speciality: text('speciality').notNull(),
	description: text('description').notNull(),
	score: integer('score').notNull().default(5),
	address: text('address'),
});

export const scheduleAvailable = sqliteTable('ScheduleAvailable', {
	id: integer('id').primaryKey().notNull(),
	day: text('day').notNull(),
	startTime: text('start_time').notNull(),
	endTime: text('end_time').notNull(),
	isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
	psychologistId: text('psychologist_id')
		.references(() => psychologist.id)
		.notNull(),
});

export const institution = sqliteTable('Institution', {
	id: text('id')
		.primaryKey()
		.references(() => user.id)
		.notNull(),
	address: text('address').notNull(),
	latitude: text('latitude').notNull(),
	length: text('length').notNull(),
});

export const psychologistInstitution = sqliteTable('PsychologistInstitution', {
	id: integer('id').primaryKey().notNull(),
	psychologistId: text('psychologist_id')
		.references(() => psychologist.id)
		.notNull(),
	institutionId: text('institution_id')
		.references(() => institution.id)
		.notNull(),
	isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
});

export const emotionalRecord = sqliteTable('EmotionalRecord', {
	id: integer('id').primaryKey().notNull(),
	date: text('date')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	emotion: text('emotion').notNull(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
});

export const appointment = sqliteTable('Appointment', {
	id: integer('id').primaryKey().notNull(),
	date: text('date').notNull(),

	isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
	originalAppointmentId: integer('original_appointment_id'),

	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	psychologistId: text('psychologist_id')
		.references(() => psychologist.id)
		.notNull(),
});

export const review = sqliteTable('Review', {
	id: integer('id').primaryKey().notNull(),
	score: integer('score').notNull(),
	comment: text('comment'),
	appointmentId: integer('appointment_id')
		.references(() => appointment.id)
		.notNull(),
});

export const chat = sqliteTable('Chat', {
	id: integer('id').primaryKey().notNull(),
	userId: text('user_id').references(() => user.id),
	psychologistId: text('psychologist_id')
		.references(() => psychologist.id)
		.notNull(),
});

export const message = sqliteTable('Message', {
	id: integer('id').primaryKey().notNull(),
	content: text('content').notNull(),
	date: text('date')
		.default(sql`(CURRENT_TIMESTAMP)`)
		.notNull(),
	chatId: integer('chat_id')
		.references(() => chat.id)
		.notNull(),
	senderId: text('sender_id')
		.references(() => user.id)
		.notNull(),
});
