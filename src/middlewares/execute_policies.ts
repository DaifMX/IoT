import { Request, Response, NextFunction} from 'express';

import AuthService from '../services/AuthService';

//=========================================================================================================
const authService = new AuthService();

const executePolicies = (policies: Array<String>) => {
    return (req: Request, res: Response, next: NextFunction) => { 
        if (policies.includes('PUBLIC')) return next();
        const hasViewPolicy = policies.includes('_VIEW');

        try {
            //Obtener token
            const token = req.cookies.token;

            if(!token){
                if (!hasViewPolicy) return res.sendUnauthorized('Token no recibido');
                else return res.redirect('/login');
            }

            //Verificar token
            const verifiedToken = authService.verifyToken(token);
            if(policies.includes('AUTHORIZED')) {
                const queryEid = parseInt(req.query.eid as string);
                const tknEid = verifiedToken.uid;
                
                const isEidDifferent = queryEid != tknEid;
   
                if(!Number.isNaN(queryEid) && isEidDifferent) return res.sendUnauthorized('No tienes permiso para realizar esta acción');

                return next();
            }

            return next();

        } catch (error: any) {
            console.error(error.message);
            res.clearCookie;
            if(!hasViewPolicy) return res.sendUnauthorized('Token invalido');
            else return res.redirect('/login');
        }
    }
};

export default executePolicies;