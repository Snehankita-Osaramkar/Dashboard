import mongoose from "mongoose";

const { Schema } = mongoose;

const vendorSchema = new Schema({
    name:String,
    type: String,
    criticality: String,
    status: String,
    contact: String,
    serviceProvided: String
});

const vendorModel = mongoose.model("vendors", vendorSchema);

export default vendorModel;