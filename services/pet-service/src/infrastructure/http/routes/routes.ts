import { Router } from 'express';
import { GetAllPetsController } from '../controllers/pets/GetAllPetsController';
import { GetPetByIdController } from '../controllers/pets/GetPetByIdController';
import { GetPetsByUserIdController } from '../controllers/pets/GetPetsByUserIdController';
import { CreatePetController } from '../controllers/pets/CreatePetController';
import { UpdatePetController } from '../controllers/pets/UpdatePetController';
import { DeletePetController } from '../controllers/pets/DeletePetController';
import { GetPacientesDetalleController } from '../controllers/pets/GetPacientesDetalleController';
import { ReactivarPetController } from '../controllers/pets/ReactivarPetController';
import { DeletePermanentePetController } from '../controllers/pets/DeletePermanentePetController';

const reactivarPetController        = new ReactivarPetController();
const deletePermanentePetController = new DeletePermanentePetController();
const router                        = Router();
const getAllPetsController           = new GetAllPetsController();
const getPetByIdController          = new GetPetByIdController();
const getPetsByUserIdController     = new GetPetsByUserIdController();
const createPetController           = new CreatePetController();
const updatePetController           = new UpdatePetController();
const deletePetController           = new DeletePetController();
const getPacientesDetalleController = new GetPacientesDetalleController();

// Rutas específicas primero
router.get('/pets/detalle',           getPacientesDetalleController.handle.bind(getPacientesDetalleController));
router.get('/pets/user/:userId',      getPetsByUserIdController.handle.bind(getPetsByUserIdController));
router.patch('/pets/:id/reactivar',   reactivarPetController.handle.bind(reactivarPetController));
router.delete('/pets/:id/permanente', deletePermanentePetController.handle.bind(deletePermanentePetController));

// Rutas genéricas después
router.get('/pets',        getAllPetsController.handle.bind(getAllPetsController));
router.get('/pets/:id',    getPetByIdController.handle.bind(getPetByIdController));
router.post('/pets',       createPetController.handle.bind(createPetController));
router.put('/pets/:id',    updatePetController.handle.bind(updatePetController));
router.delete('/pets/:id', deletePetController.handle.bind(deletePetController));

export default router;