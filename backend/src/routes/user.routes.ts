import { Router } from 'express';
import {
  cadastrarUsuario,
  loginUsuario,
  buscarUsuarioPorId,
  listarUsuarios,
  atualizarUsuario,
  atualizarParcialUsuario,
  deletarUsuario,
} from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: CRUD de Usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - profissao
 *         - idade
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         profissao:
 *           type: string
 *         idade:
 *           type: integer
 *         senha:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       404:
 *         description: Usuário já existe
 */
router.post('/', cadastrarUsuario);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', loginUsuario);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', buscarUsuarioPorId);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   email:
 *                     type: string
 *                   profissao:
 *                     type: string
 *                   idade:
 *                     type: integer
 *                   senha:
 *                     type: string
 *       500:
 *         description: Erro ao buscar usuários
 */
router.get('/', listarUsuarios);  

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário com ID inválido
 */
router.put('/:id', atualizarUsuario);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário com ID inválido
 */
router.patch('/:id', atualizarParcialUsuario);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       400:
 *         description: ID inválido
 */
router.delete('/:id', deletarUsuario);

export default router;
