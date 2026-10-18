import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import vendaMensal from "./vendaMensal.js";

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.log("Erro ao conectar ao MongoDB", error);
    }
}

connectDB();

// GET, POST, PUT, DELETE
app.post("/Vendas", async (req, res) => {
    try {
        const novaVendaMensal = await vendaMensal.create(req.body);
        res.json(novaVendaMensal);
    } catch (error) {
        res.json({ error: error })
    }
});

app.get("/Vendas", async (req, res) => {
    try {
        const VendasMensais = await vendaMensal.find();
        res.json(VendasMensais)
    } catch (error) {
        res.json({ error: error })
    }
});

app.put("/Vendas/:id", async (req, res) => {
    try {
        const AtualizarVendasMensais = await vendaMensal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        );
        res.json(AtualizarVendasMensais);
    } catch (error) {
        res.json({ error: error });
    }
});

app.delete("/Vendas/:id", async (req, res) => {
    try {
        const DeleteVendasMensais = await vendaMensal.findByIdAndDelete(
            req.params.id
        );
        res.json(DeleteVendasMensais);
    } catch (error) {
        res.json({ error: error });
    }
})

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
