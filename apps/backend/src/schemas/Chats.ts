import mongoose, { Schema } from "mongoose";

interface ChatGroup {
    Users: [
        {
            type: unknown,
            ref: string
        }
    ],
    FirestoreID: string
}

const ChatSchema = new Schema<ChatGroup>({
    Users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    FirestoreID: {
        required: true,
        unique: true,
        type: Schema.Types.String
    }
})
const SchemaX = mongoose.model('Chat', ChatSchema)
export { SchemaX as ChatSchema }