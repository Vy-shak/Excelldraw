import express from "express";
import { userRouter } from "./routes/userRouter";


const app = express();


app.use('user', userRouter)


app.listen(3002, () => {
    console.log("connected to http server successfully")
})