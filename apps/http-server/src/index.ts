import express from "express";
import { userRouter } from "./routes/userRouter";


const app = express();

app.use('api/v1/user', userRouter)




app.listen(3002, () => {
    console.log("Hello from the http-backend")
})