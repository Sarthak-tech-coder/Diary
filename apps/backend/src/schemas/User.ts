import mongoose, { Schema, SchemaType } from "mongoose";

export interface UserInterface {
    Name: string,
    Email: string,
    Password: string,
    Auth: string,
    Diaries: [
        type: unknown
    ]
}
const UserSchema = new Schema<UserInterface>({
    Name: {
        type: 'string',
        required: true,
    },
    Email: {
        type: 'string',
        required: true,
        unique: true
    },
    Auth: {
        type: "String",
        default: "user",
        enum: ["user", "admin"]
    },
    Diaries: [
        {
            type: Schema.Types.ObjectId,
            ref: "Diary"
        }
    ]
})
const User = mongoose.model<UserInterface>("User", UserSchema)
export { User as userSchema }