import {Router} from 'express'
import * as userData from './services/user.service.js'

const router = Router();

router.get('/userList',userData.userList)
export default router