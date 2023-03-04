import { Router, Request, Response } from "express"
import * as Dotenv from "dotenv"
import { authenticator } from 'otplib';
import fs from "fs"
import QRCode from 'qrcode'
Dotenv.config()
const router = Router()

router.post("/MFAQR", (req: Request, res: Response) => {
    const out = authenticator.keyuri("user", "My diary", process.env.QR_SECRET_KEY)

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
    const { Token } = req.body
    if (!Token) return res.status(500).json({ message: "token not found" })
    const isvalid = authenticator.check(Token, process.env.QR_SECRET_KEY)
    if (isvalid === true) { return res.status(200).json({ message: isvalid }) }
    else { return res.status(400).json({ message: isvalid }) }
})
export { router as MFARouter }