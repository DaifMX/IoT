import { FieldError } from "./sequelize-extended";

declare global {
    namespace Express {
        interface Response {
            // Basado en respuestas HTTP

            // 2XX
            sendSuccess(payload: object, msg?: string): void;                                       // 200
            sendCreated(payload: object, msg?: string): void;                                       // 201
            sendAccepted(payload: object, msg?: string): void;                                      // 202
            sendNoContent(msg?: object): void;                                                      // 204

            // 4XX
            sendBadRequest(reason?: string, fieldErrors?: FieldError[]): void;                      // 400
            sendUnauthorized(reason?: string): void;                                                // 401
            sendNotFound(reason?: string): void;                                                    // 404
            sendTooManyRequests(reason?: string): void;                                             // 429

            // 5XX
            sendInternalServerError(reason?: string): void;                                         // 500
        }
    }
}

export {};