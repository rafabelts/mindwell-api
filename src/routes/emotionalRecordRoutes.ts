/*

    async addRecord(req: Request, res: Response) {
        try {
            const { emotion, description, userId } = req.body;
	
    async getRecordById(req: Request, res: Response) {
        try {
            const { id } = req.params;

    async getRecords(req: Request, res: Response) {
        try {
            const { id } = req.params;
	
    async editUserRecords(req: Request, res: Response) {
        try {
            const { id, emotion, description, userId } = req.body;
    }

    async deleteUserRecord(req: Request, res: Response) {
        try {
            const { id } = req.params;
    }

*/

import { Router } from 'express';
import { EmotionalRecordController } from '../controllers/emotionalRecordController';
import { EmotionalRecordService } from '../services/emotionalRecordService';

const router = Router();

const emotionalRecordController = new EmotionalRecordController(
	new EmotionalRecordService()
);

router.post(
	'/',
	emotionalRecordController.addRecord.bind(emotionalRecordController)
);

router.get(
	'/:id',
	emotionalRecordController.getRecordById.bind(emotionalRecordController)
);

router.get(
	'/user/:id',
	emotionalRecordController.getRecords.bind(emotionalRecordController)
);

router.put(
	'/',
	emotionalRecordController.editUserRecords.bind(emotionalRecordController)
);

router.delete(
	'/:id',
	emotionalRecordController.deleteUserRecord.bind(emotionalRecordController)
);

export default router;
