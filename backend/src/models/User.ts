import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nome: string;
  email: string;
  profissao: string;
  idade: number;
  senha: string;
  criadoEm: Date;
}

const UserSchema: Schema = new Schema({
  nome: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profissao: { type: String, required: true },
  idade: { type: Number, required: true },
  senha: { type: String, required: true},
  criadoEm: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
