import mongoose, {Schema, Document} from "mongoose";

export interface IManager extends Document{
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
}

const managerSchema: Schema = new Schema<IManager>({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        default: "manager"
    }
})

export default mongoose.model<IManager>("Manager", managerSchema)