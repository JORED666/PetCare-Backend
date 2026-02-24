import { Router } from 'express';
import { ServiciosController } from '../controllers/servicios.controller';

const router = Router();
const controller = new ServiciosController();

router.get('/', controller.listar.bind(controller));
router.get('/:id', controller.obtener.bind(controller));

export default router;
