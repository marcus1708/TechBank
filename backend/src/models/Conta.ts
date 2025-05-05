import mongoose, { Schema, Document } from 'mongoose';

interface IConta extends Document {
  titular: string;
  saldo: number;
}

const ContaSchema: Schema = new mongoose.Schema({
  titular: { type: String, required: true },
  saldo: { type: Number, required: true, default: 0 },
});

export default mongoose.model<IConta>('Conta', ContaSchema);