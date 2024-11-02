export default class InvalidEntryError extends Error{
    msg = 'Elemento invalido ingresado.';

    constructor(msg?: string){
        super(msg);
        this.name = 'InvalidEntryError';
    }   
}