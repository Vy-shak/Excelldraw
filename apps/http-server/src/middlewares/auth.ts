import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { JWT_SECRET } from "@repo/common/jwtSecret";

function authmiddleware(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers["authToken"];

    if (authToken && typeof authToken === 'string') {

        if (JWT_SECRET) {
            const decoded = jwt.verify(authToken, JWT_SECRET);
            if (typeof decoded === "string") {
                req.userId = decoded
            }
        }

    }
    else if (!authToken) {
        res.status(401).send({
            err: "your token is not valid"
        })
    }

};

export { authmiddleware }


