import { Router, Request, Response } from "express";

import UserService from "../services/UserService";
import ResourceNotFoundError from "../errors/ResourceNotFoundError";

const router = Router();
const service = new UserService();

// Get ONE by ID
router.get('/:id', (req: Request, res: Response) => {
    try{
        const id = parseInt(req.params.id);
        service.getById(id);

    } catch (err: any){
        if (err instanceof ResourceNotFoundError) res.status(404).send(err.message);
        else res.status(400).send('Error desconocido.');
    }
});

export default router;