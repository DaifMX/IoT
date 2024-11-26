export type FieldError = {
    field: string;
    reason: string;
};

declare module 'sequelize' {
    interface ValidationError {
      getFieldErrors(): FieldError[];
    }
}