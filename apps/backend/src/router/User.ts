import { Router, Request, Response } from "express"
import { userSchema } from "../schemas/User"
import { DiarySchema } from "../schemas/Diaries"
import { ChatSchema } from "../schemas/Chats"
import { Firestore } from "../../firebase"
import { getDocs, Timestamp, addDoc, updateDoc, collection, setDoc, doc } from "@firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";

//import uniqueString from 'unique-string';
const router = Router()
router.get("/", (req: Request, res: Response) => {
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
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
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
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const date = `${day}/${month}/${year}`
    const diary = new DiarySchema({
        User: __id,
        Title: Title,
        SubTitle: SubTitle,
        Date: {
            Date: date,
            Day: getDay(),
            Time: formatAMPM(new Date()),
        },
        Content: Content
    })
    diary.save()
    userSchema.findById(__id).then((result) => {
        result.Diaries.push(diary._id)
        result.save()
        result.populate("Diaries").then((result) => {
            res.status(200).json({
                data: result
            })
        })
    })
})
router.post("/form_Pgroup", async (req: Request, res: Response) => {
    const Users = req.body.Users
    console.log(req.body)
    if (!Users) return res.status(500).json({ message: "failed" })
    const Combained = await makeid(15);
    console.log(Combained)
    const colRef = collection(Firestore, Combained)
    console.log(colRef)
    addDoc(colRef, {
        Timestamp: Timestamp.now(),
        User: "Administrator",
        message: "Chat Started",
        Uid: "Adminstrator id"
    })
    const Chat = new ChatSchema({
        Users: [Users[0], Users[1]],
        FirestoreID: Combained
    })
    Chat.save()
    res.json(Chat)
})
router.get("/chatroomid", (req, res) => {
    const Users = req.body.Users
    if (!Users) return res.status(500).json({ message: "failed" })
    ChatSchema.findOne({ Users: [Users[0], Users[1]] }).then((result) => {
        res.json({
            data: result
        })
    })
})

router.get("/getuser", (req: Request, res: Response) => {
    const { __id } = req.query || req.body
    userSchema.findById(__id).then((user) => {
        res.status(200).json(user)
    })
})
export { router as UserRouter }