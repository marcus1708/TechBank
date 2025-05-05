import { Request, Response } from 'express';
import User from '../models/User'; // ajuste o caminho conforme o seu projeto
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'seusegredoaqui'; // em produção use variável de ambiente!
export const cadastrarUsuario = async (req: Request, res: Response) => {
  const { nome, email, profissao, idade, senha } = req.body;

  if (!senha || typeof senha !== 'string') {
    return res.status(400).json({ mensagem: 'Senha deve ser uma string válida' });
  }

  const usuarioExistente = await User.findOne({ $or: [{ nome }, { email }] });
  if (usuarioExistente) {
    return res.status(400).json({ mensagem: 'Usuário já existe' });
  }

  const novoUsuario = await User.create({
    nome,
    email,
    profissao,
    idade,
    senha, // sem criptografia
  });

  return res.status(201).json({ id: novoUsuario._id, mensagem: 'Usuário cadastrado com sucesso' });
};
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    if (usuario.senha !== senha) {  // Se usar bcrypt, aqui muda
      return res.status(400).json({ mensagem: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: usuario._id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ 
      mensagem: 'Login realizado com sucesso',
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};
export const buscarUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário nao encontrado' });
    }
    res.json(usuario);
  } catch {
    return res.status(404).json({ mensagem: 'Usuário nao encontrado' });
  }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
};

export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario com ID inválido' });
    }
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
  } catch {
    return res.status(404).json({ mensagem: 'Usuario com ID inválido' });
  }
};

export const atualizarParcialUsuario = async (req: Request, res: Response) => {
  return atualizarUsuario(req, res);
};

export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuario já excluído' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensagem: 'Usuário excluído com sucesso' });
  } catch {
    return res.status(400).json({ mensagem: 'Usuario com ID inválido' });
  }
};
