const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunoController');
// Removendo a autenticação conforme solicitado
// const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - nome
 *         - turmaId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do aluno
 *         nome:
 *           type: string
 *           description: Nome completo do aluno
 *         dataNascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do aluno
 *         matricula:
 *           type: string
 *           description: Número de matrícula do aluno
 *         turmaId:
 *           type: integer
 *           description: ID da turma do aluno
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get('/', alunoController.listarAlunos);

/**
 * @swagger
 * /api/alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Detalhes do aluno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/:id', alunoController.buscarAluno);

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - turmaId
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               matricula:
 *                 type: string
 *               turmaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Aluno criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', alunoController.criarAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               matricula:
 *                 type: string
 *               turmaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/:id', alunoController.atualizarAluno);

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/:id', alunoController.excluirAluno);

module.exports = router; 