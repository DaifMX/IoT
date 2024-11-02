export default class ResourceNotFoundError extends Error{
    msg = 'Recurso no encontrado dentro de la base de datos.';

    constructor(msg?: string){
        super(msg);
        this.name = 'ResourceNotFoundError';
    }   
}