import { Router } from 'express';
import { SendNotificationController } from '../controllers/notifications/SendNotificationController';

const router = Router();
const sendNotificationController = new SendNotificationController();

router.post('/notifications/send', sendNotificationController.handle.bind(sendNotificationController));

export default router;