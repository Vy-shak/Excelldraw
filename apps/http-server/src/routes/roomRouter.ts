import { prisma } from "@repo/db/client";
import { Router } from "express";
import { Request, Response } from "express";
import { authmiddleware } from "../middlewares/auth";



const roomRouter = Router();

roomRouter.post('/createRoom', authmiddleware, (req, res) => {
    const { Roomname } = req.body;
    const userId = req.userId
});

roomRouter.post('/joinRoom', authmiddleware, (req, res) => {
    const { Roomname } = req.body;
    const userId = req.userId
})


