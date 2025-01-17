import express from "express";
import { userRouter } from "./routes/userRouter.js";
import { roomRouter } from "./routes/roomRouter.js";
import { Request, Response } from "express";

const app = express();
app.use(express.json());


app.use('/user', userRouter)
app.use('/room', roomRouter)

app.post('/hello', (req: Request, res: Response) => {
    res.send({
        msg: "hello"
    })
})


app.listen(3002, () => {
    console.log("connected to http server successfully")
})