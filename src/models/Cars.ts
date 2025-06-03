import mongoose, {Schema, Document} from "mongoose";

export interface ICar extends Document{
    carModel: string,
    price: number,
    year: number,
    manufacturer: string,
    category: string[],
    availability: boolean,
    stock: number
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
        type: String,
    }],
    availability: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

export default mongoose.model<ICar>("Car", CarSchema)