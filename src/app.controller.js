import { connectDB } from "./DB/connection.js"
import authController from './modules/auth/auth.controller.js'
import userController from './modules/user/user.controller.js'
const bootstrap=(app, express)=>{
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.use("/auth",authController)
app.use("/user",userController)


connectDB()
}



export default bootstrap