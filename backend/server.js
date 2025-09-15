import express from "express"
import cors from "cors"
import { connectDB } from './config/db.js'
import "dotenv/config"
import userRouter from "./routes/userRoute.js"
import learningRouter from "./routes/learningRoute.js"

//app config
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/user",userRouter);
app.use("/api/learning", learningRouter);

app.get("/",(req, res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})

//mongodb+srv://spgpt_user:ourproject@123@mini-project.yftwvm4.mongodb.net/?retryWrites=true&w=majority&appName=Mini-Project