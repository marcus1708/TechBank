import express from 'express';
import {
  criarConta,
  buscarContaPorId,
  buscarTodasContas,
  atualizarSaldoSaque,
  atualizarSaldoDeposito,
  excluirConta,
} from '../controllers/conta.controller';

const router = express.Router();

/**
 * @swagger
 * /bill:
 *   post:
 *     summary: Cria uma nova conta
 *     tags: [Conta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titular:
 *                 type: string
 *                 description: Nome do titular da conta
 *               saldo:
 *                 type: number
 *                 description: Saldo inicial da conta
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *       400:
 *         description: Titular não cadastrado
 *       500:
 *         description: Erro ao criar conta
 */
router.post('/bill', criarConta);

/**
 * @swagger
 * /bill/{id}:
 *   get:
 *     summary: Busca uma conta pelo ID
 *     tags: [Conta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da conta
 *     responses:
 *       200:
 *         description: Conta encontrada
 *       404:
 *         description: Conta não encontrada
 */
router.get('/bill/:id', buscarContaPorId);

/**
 * @swagger
 * /bill:
 *   get:
 *     summary: Lista todas as contas
 *     tags: [Conta]
 *     responses:
 *       200:
 *         description: Lista de contas
 *       500:
 *         description: Erro ao buscar contas
 */
router.get('/bill', buscarTodasContas);

/**
 * @swagger
 * /bill/saque/{id}:
 *   put:
 *     summary: Realiza um saque em uma conta
 *     tags: [Conta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da conta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 description: Valor do saque
 *     responses:
 *       200:
 *         description: Saque realizado com sucesso
 *       400:
 *         description: Saldo insuficiente
 *       404:
 *         description: Conta não encontrada
 */
router.put('/bill/saque/:id', atualizarSaldoSaque);

/**
 * @swagger
 * /bill/deposito/{id}:
 *   patch:
 *     summary: Realiza um depósito em uma conta
 *     tags: [Conta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da conta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 description: Valor do depósito
 *     responses:
 *       200:
 *         description: Depósito realizado com sucesso
 *       404:
 *         description: Conta não encontrada
 */
router.patch('/bill/deposito/:id', atualizarSaldoDeposito);

/**
 * @swagger
 * /bill/{id}:
 *   delete:
 *     summary: Exclui uma conta pelo ID
 *     tags: [Conta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da conta
 *     responses:
 *       200:
 *         description: Conta excluída com sucesso
 *       404:
 *         description: Conta não encontrada
 */
router.delete('/bill/:id', excluirConta);

export default router;