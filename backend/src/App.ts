import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: "http://localhost:5173", // Frontend na porta 5173
  credentials: true, // Se precisar enviar cookies ou tokens nos headers
}));

// Middleware para parsing de JSON
app.use(express.json());

// Definindo a rota de usuários
app.use('/users', userRoutes); // As rotas de usuários serão acessadas via '/users'

// Outras rotas podem ser adicionadas aqui...
// app.use('/outros', outroRoutes);

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
