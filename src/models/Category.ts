import mongoose, {Schema, Document} from "mongoose";

export interface ICategory extends Document{
    name: string,
    description?: string,
}

const categorySchema: Schema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
    }
})

export default mongoose.model<ICategory>("Category", categorySchema)