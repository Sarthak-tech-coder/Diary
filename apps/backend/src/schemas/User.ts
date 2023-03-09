import mongoose, { HydratedDocument, Model, Schema, SchemaType, Document } from "mongoose";
import * as bcrypt from "bcryptjs"
import paginate from 'mongoose-paginate-v2';

export interface UserInterface extends Document {
    Name: string,
    Email: string,
    Password: string,
    Auth: string,
    isConnected: boolean,
    Token: string,
    Diaries: [
        type: unknown
    ],
    verified: boolean,
}
interface UserInterfaceMethods {
    ReturnAllDATA(): object,
    Encode(): object
}
interface UserInterfaceModel extends Model<UserInterface, {}, UserInterfaceMethods> {
    findAllUsers(): HydratedDocument<UserInterface, UserInterfaceMethods>
}
const UserSchema = new Schema<UserInterface, UserInterfaceModel>({
    Name: {
        type: 'string',
        required: true,
    },
    Password: {
        type: 'string',
        required: true,
    },
    isConnected: {
        type: 'boolean',
        default: false
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
    Token: {
        type: "String",
    },
    Diaries: [
        {
            type: Schema.Types.ObjectId,
            ref: "Diary"
        }
    ],
    verified: {
        type: "Boolean",
        default: false
    }
})
UserSchema.statics.findAllUsers = function () {
    return this.find()
}
UserSchema.methods.ReturnAllDATA = function () {
    return (this)
}
UserSchema.methods.Encode = function () {
    var salt = bcrypt.genSaltSync(10);
    this.Password = bcrypt.hashSync(this.Password, salt)
    return (this)
}

UserSchema.plugin(paginate)
const User = mongoose.model<UserInterface, UserInterfaceModel>("User", UserSchema)

export { User as userSchema }