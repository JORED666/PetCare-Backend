import { Router } from 'express';
import { PetsController } from '../controllers/pets.controller';

const router = Router();
const controller = new PetsController();

// Rutas auxiliares (especies y razas)
router.get('/species', controller.getSpecies.bind(controller));
router.get('/breeds', controller.getBreeds.bind(controller));

// CRUD de mascotas
router.get('/', controller.getAll.bind(controller));
router.get('/:id', controller.getById.bind(controller));
router.get('/client/:clientId', controller.getByClientId.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
