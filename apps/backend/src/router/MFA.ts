import { Router, Request, Response } from "express"
import * as Dotenv from "dotenv"
import { authenticator } from 'otplib';
import fs from "fs"
import QRCode from 'qrcode'
Dotenv.config()
const router = Router()

router.get("/MFAQR", (req: Request, res: Response) => {
    const { user } = req.query || req.body
    const out = authenticator.keyuri(user, "My diary", process.env.QR_SECRET_KEY)
    if (!user) return res.status(500).json({ message: "user not found" })
    QRCode.toDataURL(out, (err: unknown, DATA: string) => {
        if (err) return res.status(500).json({ error: err })
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = DATA.match(regex);
        const ext = matches[1];
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');
        const root = "./apps/backend/src/assets/data." + ext
        console.log(root, "____")
        fs.writeFileSync(root, buffer);
        console.log("\x1b[36m", root, "\x1b[37m")
        res.sendFile(__dirname + "/assets/data." + ext)
    })
})
router.post("/verify", (req: Request, res: Response) => {
    const { Token } = req.query || req.body
    console.log(Token)
    if (!Token) return res.status(500).json({ message: "token not found" })
    const isvalid = authenticator.check(Token, process.env.QR_SECRET_KEY)
    res.json({ isValid: isvalid })
})
export { router as MFARouter }