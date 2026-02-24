import { Router } from 'express';
import { ProfessionalsController } from '../controllers/professionals.controller';

const router = Router();
const controller = new ProfessionalsController();

router.get('/', controller.listar.bind(controller));

export default router;
