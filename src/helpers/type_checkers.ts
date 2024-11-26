export const isString = (value: any): boolean => {
    return typeof value == "string"
};

export const isArrayString = (array: any): boolean => {
    return Array.isArray(array) && array.every(item => isString(item));
};