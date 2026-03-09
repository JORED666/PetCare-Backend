import { Router } from 'express';
import { GetAllPetsController } from '../controllers/pets/GetAllPetsController';
import { GetPetByIdController } from '../controllers/pets/GetPetByIdController';
import { GetPetsByUserIdController } from '../controllers/pets/GetPetsByUserIdController';
import { CreatePetController } from '../controllers/pets/CreatePetController';
import { UpdatePetController } from '../controllers/pets/UpdatePetController';
import { DeletePetController } from '../controllers/pets/DeletePetController';

const router = Router();

const getAllPetsController = new GetAllPetsController();
const getPetByIdController = new GetPetByIdController();
const getPetsByUserIdController = new GetPetsByUserIdController();
const createPetController = new CreatePetController();
const updatePetController = new UpdatePetController();
const deletePetController = new DeletePetController();

router.get('/pets', getAllPetsController.handle.bind(getAllPetsController));
router.get('/pets/:id', getPetByIdController.handle.bind(getPetByIdController));
router.get('/pets/user/:userId', getPetsByUserIdController.handle.bind(getPetsByUserIdController));
router.post('/pets', createPetController.handle.bind(createPetController));
router.put('/pets/:id', updatePetController.handle.bind(updatePetController));
router.delete('/pets/:id', deletePetController.handle.bind(deletePetController));

export default router;