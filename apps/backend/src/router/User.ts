import { Router, Request, Response } from "express"
import { userSchema } from "../schemas/User"
import { UserInterface } from "../schemas/User"
const router = Router()
router.get("/", (req, res) => {
    res.json({ "message": "userAPI" })
})
router.all("/register", async (req: Request, res: Response) => {
    const { Name, Password, Email } = req.query || req.body
    if (!Name || !Password || !Email) return res.status(400).json({ message: "failed" })
    const User = new userSchema({
        Name: Name,
        Password: Password,
        Email: Email,
    })
    User.save().then(() => {
        res.status(201).json({
            success: true,
            messgae: "Account registered successfully"
        })
    }).catch(() => {
        res.status(500).json({
            success: false,
            messgae: "registration failed successfully"
        })
        console.log("\x1b[31m", "failed")
    })
})
function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function getDay() {
    const Days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    const today = new Date()
    return Days[today.getDay()]
}
router.post("/diary", async (req: Request, res: Response) => {
    const { __id, Title, SubTitle, Content } = req.query || req.body
    const today = new Date()
    console.log(Content)
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const date = `${day}/${month}/${year}`
    userSchema.findById(__id).then((docs) => {
        docs.Diarys.push({
            Title: Title,
            SubTitle: SubTitle,
            _id: "",
            Date: {
                Day: getDay(),
                Date: date,
                Time: formatAMPM(new Date)
            },
            Content: Content
        })
        docs.save()
        return res.json(docs)
    })
})
router.get("/getuser", (req: Request, res: Response) => {
    const { __id } = req.query || req.body
    userSchema.findById(__id).then((user) => {
        res.json(user)
    })
})
export { router as UserRouter }