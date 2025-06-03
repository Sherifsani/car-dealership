import mongoose, { Schema, Document } from "mongoose";

export interface IPurchase extends Document {
    customer: mongoose.Types.ObjectId;
    car: mongoose.Types.ObjectId;
    price: number;
    date: Date;
}

const PurchaseSchema: Schema = new Schema<IPurchase>({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model<IPurchase>("Purchase", PurchaseSchema);