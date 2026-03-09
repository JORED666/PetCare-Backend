import { Router } from 'express';
import { GetAllClientsController } from '../controllers/clients/GetAllClientsController';
import { GetClientByIdController } from '../controllers/clients/GetClientByIdController';
import { UpdateClientController } from '../controllers/clients/UpdateClientController';
import { DeleteClientController } from '../controllers/clients/DeleteClientController';

const router = Router();

const getAllClientsController = new GetAllClientsController();
const getClientByIdController = new GetClientByIdController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

router.get('/clients', getAllClientsController.handle.bind(getAllClientsController));
router.get('/clients/:id', getClientByIdController.handle.bind(getClientByIdController));
router.put('/clients/:id', updateClientController.handle.bind(updateClientController));
router.delete('/clients/:id', deleteClientController.handle.bind(deleteClientController));

export default router;