import {Router} from 'express'
import * as registration from './services/registration.service.js'

const router = Router();

router.post('/signup',registration.signup)
router.post('/login',registration.login)
export default router