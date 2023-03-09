import { Router, Request, Response } from "express"
import * as Dotenv from "dotenv"
import { authenticator } from 'otplib';
import fs from "fs"
import QRCode from 'qrcode'
import path from "path"
Dotenv.config()
const router = Router()

router.post("/MFAQR", (req: Request, res: Response) => {
    const { Secret, User } = req.body
    const out = authenticator.keyuri(`${User}`, "My diary", Secret)
    QRCode.toDataURL(out, (err: unknown, DATA: string) => {
        if (err) return res.status(500).json({ error: err })
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const matches = DATA.match(regex);
        const data = matches[2];
        const buffer = Buffer.from(data, 'base64');
        const root = path.join(__dirname, "./assets/data.png");
        fs.writeFileSync(root, buffer);
        res.sendFile(__dirname + "/assets/data.png")
    })
})
router.post("/verify", (req: Request, res: Response) => {
    const { Token, Secret } = req.body
    if (!Token) return res.status(500).json({ message: "token not found" })
    const isvalid = authenticator.check(Token, Secret)
    if (isvalid === true) { return res.status(200).json({ message: isvalid }) }
    else { return res.status(400).json({ message: isvalid }) }
})
export { router as MFARouter }