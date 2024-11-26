import { Request, RequestHandler, Response, Router, NextFunction } from "express";
import { isArrayString } from '../helpers/type_checkers';

import executePolicies from "../middlewares/execute_policies";

import { FieldError } from "../types/sequelize-extended";
import InternalError from "../errors/InternalError";

//=========================================================================================================
export default abstract class BaseRouter {
    private router;

    constructor(){
        this.router = Router();
        this.init();    
    };

    init(){};

    public getRouter(): Router { return this.router; };

    //=========================//
    //     ROUTER METHODS      //
    //=========================//
    public get(path: string, policies: Array<string>, ...callbacks: RequestHandler[]): void{
        if(this.validatePolicies(policies, path)) this.router.get(path, this.generateCustomResponses, executePolicies(policies), callbacks);
    };

    public patch(path: string, policies: Array<string>, ...callbacks: RequestHandler[]): void{     
        if(this.validatePolicies(policies, path)) this.router.patch(path, this.generateCustomResponses, executePolicies(policies), callbacks);
    };

    public post(path: string, policies: Array<string>, ...callbacks: RequestHandler[]): void{
        if(this.validatePolicies(policies, path)) this.router.post(path, this.generateCustomResponses, executePolicies(policies), callbacks);
    };

    public put(path: string, policies: Array<string>, ...callbacks: RequestHandler[]): void{
        if(this.validatePolicies(policies, path)) this.router.put(path, this.generateCustomResponses, executePolicies(policies), callbacks);
    };

    public delete(path: string, policies: Array<string>, ...callbacks: RequestHandler[]): void{
        if(this.validatePolicies(policies, path)) this.router.delete(path, this.generateCustomResponses, executePolicies(policies), callbacks);
    };

    //=========================//
    //    INTERNAL METHODS     //
    //=========================//

    // Verficar que los politicas puestas en los arrays sean validas
    private validatePolicies = (policies: Array<string>, path: string): boolean => {
        // Validar que el endpoint este definido correctamente
        const allowedPolicies = ['PUBLIC', 'AUTHORIZED', 'USER', '_VIEW'];

        if(!policies || !isArrayString(policies)) throw new InternalError(`On path ${path}. Requires policies.`);
        if(policies.includes('PUBLIC') && policies.length > 1) throw new InternalError(`On path ${path}. Policy "PUBLIC" has to be ONLY policy.`);
        
        // Validar _VIEW si es que existe
        if(policies.includes('_VIEW')){
            if (policies.length < 2) throw new InternalError(`On path ${path}. Policy "_VIEW" depends on a role policy (USER/AUTHORIZED).`)  
            if (policies[0] != '_VIEW') throw new InternalError(`On path ${path}. Policy "_VIEW" has to be on index 0 on the policy array.`);
        } 

        // Revisar por roles invalidos
        policies.forEach((policy) => {
            if (!allowedPolicies.includes(policy))throw new InternalError(`On path ${path}. Role "${policy}" is not on the list of allowed policies ${allowedPolicies}.`);
        })

        // Revisar por duplicados
        const uniquePolicies = new Set(policies);
        if (uniquePolicies.size !== policies.length) throw new InternalError(`On path ${path}. Policy array contains duplicate values.`);

        return true;
    }
    
    private generateCustomResponses = (_req: Request, res: Response, next: NextFunction) => {
        //2XX
        res.sendSuccess = (payload: Object, msg?: string) => res.status(200).json({status:'success', payload, msg});
        res.sendCreated = (payload: Object, msg?: string) => res.status(201).json({status: 'success', payload, msg});
        res.sendAccepted = (payload: Object, msg?: string) => res.status(202).json({status: 'success', payload, msg});
        
        // 4XX
        res.sendBadRequest = (reason?: string, fieldErrors?: FieldError[]) => {
            const jsonRes: any = {status:'error', error: reason || 'Error en la solicitud enviada.'};

            if(fieldErrors) jsonRes.fields = fieldErrors;
            res.status(400).json(jsonRes);
        }
        res.sendUnauthorized = (reason?: string) => res.status(401).json({
            status: 'error', 
            error: reason || 'Usuario no autorizado.'
        });
        res.sendNotFound = (reason?: string) => res.status(404).json({
            status: 'error',
            error: reason || 'Recurso no encontrado.'
        });
        res.sendTooManyRequests = (reason?: string) => res.status(429).json({
            status: 'error', 
            error: reason || 'Demasiadas solicitudes. Intente nuevamente más tarde.'
        });

        // 5XX
        res.sendInternalServerError = (reason?: string) => res.status(500).json({
            status: 'error', 
            error: reason || 'Error interno en el servidor. Contace un administrador.'
        });

        next();
    };
}