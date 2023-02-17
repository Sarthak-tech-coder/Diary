import mongoose, { Schema } from "mongoose";

interface Diary {
    User: object,
    Title: string,
    SubTitle: string,
    Date: {
        Day: string,
        Date: string,
        Time: string,
    }
    Content: string,
}
const DiarySchema = new Schema<Diary>({
    User: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    Title: {
        type: "string"
    },
    SubTitle: {
        type: "string"
    },
    Date: {
        Day: {
            type: "string",
        },
        Date: {
            type: "string",
        },
        Time: {
            type: "string",
        }
    },
    Content: {
        type: "string"
    }
})
const DiaryModel = mongoose.model<Diary>("Diary", DiarySchema)
export { DiaryModel as DiarySchema }