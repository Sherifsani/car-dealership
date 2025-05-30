import mongoose, {Schema, Document} from "mongoose";

export interface ICar extends Document{
    carModel: string,
    price: number,
    year: number,
    manufacturer: string,
    category: mongoose.Types.ObjectId[],
    availability: boolean,
}

const CarSchema: Schema = new Schema<ICar>({
    carModel:{
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export default mongoose.model<ICar>("Car", CarSchema)