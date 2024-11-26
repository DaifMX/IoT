import jwt from 'jsonwebtoken';

import UserService from './UserService';

import { DecodedToken } from '../types/types';

import RuntimeError from '../errors/RuntimeError';
import InternalError from '../errors/InternalError';
//=========================================================================================================
export default class AuthService {
    private userService = new UserService();
    private SECRET = process.env.JWT_SECRET;
    
    public login = async (email: string, password: string): Promise<string> => {
        // Verificar que se haya enviado el correo y la contraseña
        if(!email || !password) throw new InternalError('Creedenciales no recibidas');

        //Buscar empleado en la base de datos
        const user = await this.userService.getByEmail(email);
        
        //Comparar la contraseña ingresada con la contraseña en la base de datos
        const isPasswordValid = await user.isPasswordValid(password);
        if (!isPasswordValid) throw new RuntimeError('Creedenciales incorrectas');

        //Token resultante
        return jwt.sign({
            uid: user.id,
            name: `${user.first_name} ${user.last_name}`,
        }, this.SECRET!, {expiresIn: '1d', algorithm: 'HS256'});
    };


    public verifyToken = (token: string) => {
        try{
            const verifiedToken = jwt.verify(token, this.SECRET!);
            const {uid, name} = verifiedToken as DecodedToken;

            return {uid, name};
        
        } catch (err: any){
            throw new RuntimeError('Token invalido');
        }
        
    };

    
    public parseToken = (token: string): DecodedToken => {
        const decoded = jwt.decode(token) as DecodedToken;  

        if(!decoded) throw new RuntimeError('Token invalido');
        
        return decoded;
    };
}