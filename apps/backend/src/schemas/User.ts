import mongoose, { Schema } from "mongoose";

export interface UserInterface {
    Name: string,
    Email: string,
    Password: string,
    Auth: string,
    Diarys: [{
        _id: string,
        Title: string,
        SubTitle: string,
        Date: {
            Day: string,
            Date: string,
            Time: string,
        },
        Content: string,
    }]
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
    Diarys: [
        {
            _id: {
                type: "string",
            },
            Title: {
                type: 'string',
            },
            SubTitle: {
                type: 'string',
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
                type: "String",
            }
        }
    ]
})
const User = mongoose.model<UserInterface>("User", UserSchema)
export { User as userSchema }