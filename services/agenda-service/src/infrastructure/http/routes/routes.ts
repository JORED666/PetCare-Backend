import { Router } from 'express';
import { GetAgendaByVeterinarioController } from '../controllers/agenda/GetAgendaByVeterinarioController';
import { CreateAgendaController } from '../controllers/agenda/CreateAgendaController';
import { UpdateAgendaStatusController } from '../controllers/agenda/UpdateAgendaStatusController';
import { DeleteAgendaController } from '../controllers/agenda/DeleteAgendaController';

const router = Router();

const getAgendaByVeterinarioController = new GetAgendaByVeterinarioController();
const createAgendaController = new CreateAgendaController();
const updateAgendaStatusController = new UpdateAgendaStatusController();
const deleteAgendaController = new DeleteAgendaController();

router.get('/agenda/veterinario/:vetId', getAgendaByVeterinarioController.handle.bind(getAgendaByVeterinarioController));
router.post('/agenda', createAgendaController.handle.bind(createAgendaController));
router.put('/agenda/:id/status', updateAgendaStatusController.handle.bind(updateAgendaStatusController));
router.delete('/agenda/:id', deleteAgendaController.handle.bind(deleteAgendaController));

export default router;