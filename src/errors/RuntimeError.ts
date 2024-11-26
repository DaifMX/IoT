//=========================================================================================================
export default class RuntimeError extends Error{
    msg = 'Error interno en tiempo de ejecución. Contacte un administrador.';

    constructor(msg?: string){
        super(msg);
        this.name = 'RuntimeError';
    }   
}