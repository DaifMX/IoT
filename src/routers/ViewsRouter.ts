import { Router, Request, Response } from "express";

const router = Router();

const BASE_PORT = process.env.EXPRESS_PORT;
const BASE_URL = process.env.API_BASE_URL ? `${process.env.API_BASE_URL}:${BASE_PORT}/api` : `http://localhost:${BASE_PORT}/api`;

router.get('/register', (res: Response, _req: Request) => {
    res.render('Register');
});

router.get('/login', (res: Response, _req: Request) => {
    res.render('Login', {
        css: 'Login',
        baseUrl: BASE_URL,
        layout: false,
    });
});

router.get('/home', (res: Response, _req: Request) => {
    res.render('Home');
});

export default router;