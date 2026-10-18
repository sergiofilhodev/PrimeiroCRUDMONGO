import mongoose from "mongoose";

const vendaMensalSchema = new mongoose.Schema({
    nomeProduto: String,
    mes: Number,
    valorVendido: Number
});

export default mongoose.model("vendaMensal", vendaMensalSchema);