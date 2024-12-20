import allowedOrigins from "./allowed_origins";
import RuntimeError from "../errors/RuntimeError";

//=========================================================================================================
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new RuntimeError('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};

export default corsOptions;