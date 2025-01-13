import { Router } from "express";
import { Request, Response } from "express";


const userRouter = Router();



userRouter.post('/signup', (req: Request, res: Response) => {
    res.send({
        msg: "hi from signup"
    })
})

userRouter.post('/signin', (req: Request, res: Response) => {
    res.send({
        msg: "hi from signin"
    })
})

export { userRouter }