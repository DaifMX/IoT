import {Response, Request, Router} from 'express';
import WtrTankService from '../services/WtrTankService';
import ResourceNotFoundError from '../errors/ResourceNotFoundError';

const router = Router();
const service = new WtrTankService();

router.get('/:id', (res: Response, req: Request) => {
    try {
        const id = parseInt(req.params.id);
        const user = service.getById(id);

        res.status(200).send({status:'success', payload: user});

    } catch (err: any) {
        if (err instanceof ResourceNotFoundError) res.status(404).send({status: 'error', reason: 'Acuario no encontrado.'});
        else res.status(500).send({status: 'error', reason: 'Error desconocido.'});
    }
})

export default router;