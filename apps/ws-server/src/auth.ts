import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common/jwtSecret";

function authCheck(token: string) {

    if (token && typeof token === 'string') {
        if (JWT_SECRET) {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
            console.log('decoded', decoded)
            return decoded.id
        }
        else {
            return null
        }

    }
};

export { authCheck }