import { Router } from "express";
import { Request, Response } from "express";
import { prisma } from "@repo/db/client"
import { authmiddleware } from "../middlewares/auth";
import bcrypt from "bcrypt"
import { JWT_SECRET } from "@repo/common/jwtSecret";
import jwt from "jsonwebtoken"
import { signinSchema, signupSchema } from "@repo/common2/zod"
import { deflate } from "zlib";
import { error } from "console";

console.log("env secret is:-", JWT_SECRET);

const userRouter: Router = Router();



userRouter.post('/signup', (req: Request, res: Response) => {

    const { name, email, password } = req.body;

    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: "your credential is not valid"
        })
        return;
    }

    try {
        (async function signupUser() {
            const hashedPass = await bcrypt.hash(password, 5);
            console.log(hashedPass);
            const duplicate = await prisma.user.findFirst({
                where: {
                    email: email
                }
            });

            if (duplicate) {
                res.status(411).send({
                    msg: "this email already exist"
                });
                return
            }

            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPass
                }

            });


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

    const parsedData = signinSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        res.status(411).json({
            message: "your credential is not valid"
        })
        return;
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
                    const token = await jwt.sign({ id: user.id }, JWT_SECRET);
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
            else {
                res.status(411).send({
                    msg: "sorry no account exist on this email",
                })
            }
        })()
    } catch (error) {
        res.status(401).send({
            err: "some error updating data to db"
        })
        return
    }


});

userRouter.get('/getData', authmiddleware, async (req: Request, res: Response) => {
    const id = req.id;

    try {
        console.log("getdata comming", id)
        const userData = await prisma.user.findFirst({
            where: {
                id: id
            }
        });
        if (userData) {
            res.status(200).send(userData)
        }
    } catch (error) {
        res.status(411).send({
            err: "can not get the userdata",
            details: error
        })
    }
});

userRouter.post('/updateInfo', authmiddleware, async (req: Request, res: Response) => {
    const id = req.id;
    const { url, bio } = req.body;
    console.log(id)
    try {
        if (!url) {
            res.send({
                err: "the image url is not valid",
            });
            return
        };

        const userData = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                imgUrl: url,
                bio: bio
            }
        });
        if (!userData) {
            res.send({
                err: "your userData is missing please login",
                details: error
            });
            return
        }
        res.send({
            msg: "the data updated successfully",
            details: userData
        })

    } catch (error) {
        res.status(411).send({
            err: "can not get the userdata",
            details: error
        })
    }
})


export { userRouter }