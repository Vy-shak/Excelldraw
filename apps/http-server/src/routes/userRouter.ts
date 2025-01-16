import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "@repo/db/client"
import bcrypt from "bcrypt"
import { JWT_SECRET } from "@repo/common/jwtSecret";
import jwt from "jsonwebtoken"

console.log("env secret is:-", JWT_SECRET);

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

userRouter.post('/signin', (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (!password) {
        res.status(401).send({
            err: "please type your password"

        });
        return
    }


    try {
        (async function signinUser() {
            const user = await prisma.user.findFirst({
                where: {
                    email
                }
            });
            if (user) {
                const hashedpass = await bcrypt.compare(password, user.password);
                if (hashedpass && JWT_SECRET) {
                    const token = await jwt.sign({ userId: user.id }, JWT_SECRET);
                    res.status(200).send({
                        msg: "your jwt token generated successfully",
                        token: token
                    })
                }
                else if (!hashedpass) {
                    res.status(411).send({
                        msg: "your password is incorrect"
                    })
                    return
                }
            }
        })()
    } catch (error) {
        res.status(401).send({
            err: "some error updating data to db"
        })
        return
    }


});


export { userRouter }