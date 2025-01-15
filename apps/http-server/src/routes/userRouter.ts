import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "@repo/db/client"
import bcrypt from "bcrypt"


const userRouter: Router = Router();



userRouter.post('/signup', (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    if (!password) {
        res.status(401).send({
            err: "please type your password"

        });
        return
    }


    try {
        (async function signupUser() {
            const hashedPass = await bcrypt.hash(password, 5);
            console.log(hashedPass)
            const user = await prisma.user.upsert({
                where: { email: email },
                update: {},
                create: {
                    email: email,
                    name: name,
                    password: hashedPass
                }
            });
            console.log(user)

            res.status(200).send({
                msg: "signup done"
            })
        })()
    } catch (error) {
        res.send({
            err: "some error updating data to db"
        })
    }


});


export { userRouter }