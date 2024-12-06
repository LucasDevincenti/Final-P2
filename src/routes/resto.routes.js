import { Router } from "express";
import { login } from "../controller/auth.controller.js";
import { getUsuario, postUsuario, putUsuario, getUsuarioId } from "../controller/usuario.controller.js";

const router = Router()

router.get('/usuario', getUsuario)
router.get('/usuario/:id', getUsuarioId)
router.post('/usuario', postUsuario)
router.put('/usuario/:id', putUsuario)
router.post('/login', login);

export default router





