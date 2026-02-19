import { Router } from 'express';
import { ClientsController } from '../controllers/clients.controller';

const router = Router();
const controller = new ClientsController();

// GET /api/clients - Listar todos
router.get('/', controller.getAll.bind(controller));

// GET /api/clients/:id - Obtener uno
router.get('/:id', controller.getById.bind(controller));

// POST /api/clients - Crear
router.post('/', controller.create.bind(controller));

// PUT /api/clients/:id - Actualizar
router.put('/:id', controller.update.bind(controller));

// DELETE /api/clients/:id - Eliminar (soft delete)
router.delete('/:id', controller.delete.bind(controller));

export default router;
