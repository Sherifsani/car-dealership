import mongoose, { Schema, Document } from "mongoose";
export interface ICustomer extends Document {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    purchasedCars: mongoose.Types.ObjectId[];
}

const customerSchema: Schema = new Schema<ICustomer>({
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
        default: "customer"
    },
    purchasedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        default: []
    }]
});


export default mongoose.model<ICustomer>("Customer", customerSchema);