import multer from "multer";
import AuthService from '../services/AuthService';
import path from "node:path";

const authService = new AuthService();

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const tkn = authService.parseToken(req.cookies.token);
    const cookiesEid = tkn.uid;
    let queryEid = parseInt(req.query.eid as string);

    if (!queryEid) queryEid = cookiesEid;

    const main = require.main as NodeJS.Module;
    const rootDir = path.dirname(main.filename).replace('src', '');
    const fullPath = path.join(rootDir,`\\tank_img\\${queryEid}` );

    cb(null, fullPath);
  },

  filename: async (req, _file, cb) => {
    const tkn = authService.parseToken(req.cookies.token);
    const cookiesEid = tkn.uid;
    let queryEid = parseInt(req.query.eid as string);

    if (!queryEid) queryEid = cookiesEid;

    cb(null, `${queryEid}_${Date.now()}_${req.query.field}${req.query.mime_type}`);
  },
});

const upload = multer({ storage: storage });

export default upload;
  