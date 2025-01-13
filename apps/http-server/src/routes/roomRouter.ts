import { Router } from "express"
import { Response, Request } from "express";


const roomRouter = Router();


roomRouter.post('/createRoom', (req: Request, res: Response) => {
    res.send({
        msg: 'room created'
    })
});

roomRouter.post('/joinRoom', (req: Request, res: Response) => {
    res.send({
        msg: 'room created'
    })
})