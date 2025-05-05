import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Importação do CORS
import { setupSwagger } from './swagger';
import userRoutes from './routes/user.routes';
import contaRoutes from './routes/conta.routes';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log('🔗 MONGO_URL:', process.env.MONGO_URL);

async function startServer() {
  const app = express();

  // Configuração do CORS
  app.use(cors({
    origin: "http://localhost:5173", // Permitir requisições do frontend
    credentials: true, // Permitir envio de cookies ou headers de autenticação
  }));

  app.use(express.json());

  // ✅ Rota inicial
  app.get('/', (req, res) => {
    res.send('🚀 API TechBank está no ar!');
  });

  await mongoose.connect(process.env.MONGO_URL as string);

  setupSwagger(app);

  // Rotas
  app.use('/users', userRoutes);
  // Adicione as rotas de Conta
  app.use('/', contaRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('❌ Error starting server:', err);
});