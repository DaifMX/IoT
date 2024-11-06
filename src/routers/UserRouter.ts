import { Router, Request, Response } from "express";

import UserService from "../services/UserService";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";

// import EmployeeNewEntry from '../types/UserTypes';
import { ValidationError } from "sequelize";

const router = Router();
const service = new UserService();

// Obtener usuario
router.get('/:id', async (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        const user = await service.getById(id);
        res.status(200).send({status: 'success', payload: user});

    } catch (err: any){
        if (err instanceof ResourceNotFoundError) res.status(404).send(err.message);
        else res.status(500).send({status: 'error', reason: 'Error desconocido.'});
    }
});

// Crear usuario
router.post('/', async (req: Request, res: Response) => {
    try{
        const entry = req.body;
        const user = await service.create(entry);
        res.status(200).send({status: 'success', payload: user});

    } catch (err: any){
        if (err instanceof ValidationError) res.status(400).send({status: 'error', reason:'Campo/s de usuario invalidos'});
        else res.status(500).send({status: 'error', reason: 'Error desconocido.'});
    }
});

// Actualizar usuario
router.patch('/:id', async (req: Request, res: Response) =>{
    try {
        const id  = parseInt(req.params.id);
        const entry = req.body;

        const user = await service.update(id, entry);
        res.status(200).send({status: 'success', payload: user});
    
    } catch (err: any){
        if(err instanceof ResourceNotFoundError) res.status(404).send({status: 'error', reason: 'Usuario no encontrado.'});
        else res.status(500).send({status: 'error', reason: 'Error desconocido.'});
    }
});

export default router;