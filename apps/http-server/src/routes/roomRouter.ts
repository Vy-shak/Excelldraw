import { prisma } from "@repo/db/client";
import { Router } from "express";
import { Request, Response } from "express";
import { authmiddleware } from "../middlewares/auth";



const roomRouter: Router = Router();

roomRouter.post('/create', authmiddleware, async (req, res) => {
    const { roomname } = req.body;
    const id = req.id;
    console.log(id)
    console.log(typeof id);


    try {
        if (id) {
            const room = await prisma.rooms.create({
                data: {
                    roomname: roomname,
                    adminId: id,
                }
            });

            if (!room) {
                res.status(411).send({
                    msg: "some error in your account"
                });
                return
            };

            res.send({
                msg: 'room created successfully',
                code: room["roomCode"],
                roomName: room["roomname"]
            })
        }
        else {
            res.status(411).send({
                msg: "invalid email"
            })
        }
    } catch (error) {
        res.status(411).send({
            err: "can not create room",
            details: error
        })
    }

});



export { roomRouter }
