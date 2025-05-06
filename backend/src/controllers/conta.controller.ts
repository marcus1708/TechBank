import { Request, Response } from 'express';
import Conta from '../models/Conta';
import Usuario from "../models/User"; 


// POST /bill - Criar conta
export const criarConta = async (req: Request, res: Response) => {
  const { titular, saldo } = req.body;

  try {
    // Verifica se o titular existe no banco de dados
    const usuario = await Usuario.findOne({ nome: titular });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Titular não cadastrado." });
    }

    // Cria a conta
    const novaConta = new Conta({ titular, saldo });
    await novaConta.save();

    res.status(201).json({ mensagem: "Conta cadastrada com sucesso" ,id:novaConta._id});
  } catch (error) {
    console.error("Erro ao criar conta:", error);
    res.status(500).json({ mensagem: "Erro ao criar conta." });
  }
};

// GET /bill/:id - Buscar conta específica
export const buscarContaPorId = async (req: Request, res: Response) => {
  try {
    const conta = await Conta.findById(req.params.id);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada' });
    res.status(200).json(conta);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar conta', error });
  }
};

// GET /bill - Buscar todas as contas
export const buscarTodasContas = async (_req: Request, res: Response) => {
  try {
    const contas = await Conta.find();
    res.status(200).json(contas);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar contas', error });
  }
};

// PUT /bill - Atualizar saldo (saque)
export const atualizarSaldoSaque = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { valor } = req.body;

  try {
    const conta = await Conta.findById(id);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada' });

    if (conta.saldo < valor) {
      return res.status(400).json({ mensagem: 'Saldo insuficiente' });
    }

    conta.saldo -= valor;
    await conta.save();
    res.status(200).json({ mensagem: 'Saque realizado com sucesso', conta });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar saldo', error });
  }
};

// PATCH /bill - Atualizar saldo (depósito)
export const atualizarSaldoDeposito = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { valor } = req.body;

  try {
    const conta = await Conta.findById(id);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada' });

    if (valor <= 0) {
      return res.status(400).json({ mensagem: 'Valor deve ser maior que zero' });
    }

    conta.saldo += valor;
    await conta.save();
    res.status(200).json({ mensagem: 'Depósito realizado com sucesso', conta });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar saldo', error });
  }
};

// DELETE /bill - Excluir conta
export const excluirConta = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const conta = await Conta.findById(id);

    if (!conta) {
      return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    await Conta.findByIdAndDelete(id);

    res.status(200).json({ mensagem: "Conta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    res.status(500).json({ mensagem: "Erro ao excluir conta." });
  }
};