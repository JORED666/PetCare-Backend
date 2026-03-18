import { Router } from 'express';
import { GetAllClientsController } from '../controllers/clients/GetAllClientsController';
import { GetClientByIdController } from '../controllers/clients/GetClientByIdController';
import { UpdateClientController } from '../controllers/clients/UpdateClientController';
import { DeleteClientController } from '../controllers/clients/DeleteClientController';
import { GetClientesDetalleController } from '../controllers/clients/GetClientesDetalleController';


const router = Router();

const getAllClientsController      = new GetAllClientsController();
const getClientByIdController      = new GetClientByIdController();
const updateClientController       = new UpdateClientController();
const deleteClientController       = new DeleteClientController();
const getClientesDetalleController = new GetClientesDetalleController();

router.get('/clients/detalle', getClientesDetalleController.handle.bind(getClientesDetalleController));
router.get('/clients', getAllClientsController.handle.bind(getAllClientsController));
router.get('/clients/:id', getClientByIdController.handle.bind(getClientByIdController));
router.put('/clients/:id', updateClientController.handle.bind(updateClientController));
router.delete('/clients/:id', deleteClientController.handle.bind(deleteClientController));

export default router;