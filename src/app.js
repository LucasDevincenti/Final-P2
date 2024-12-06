import express from "express";
import router from "./routes/resto.routes.js";
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Corregido PATCH
    allowedHeaders: ['Content-Type', 'Authorization'] // Corregido a allowedHeaders
};

app.use(cors(corsOptions)); // Mover cors antes de las rutas

app.use(express.json());
app.use(router);

export default app;
