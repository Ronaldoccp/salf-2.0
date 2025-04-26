const express = require('express');
const router = express.Router();
const avaliacaoController = require('../controllers/avaliacaoController');
// Removendo a autenticação conforme solicitado
// const { authMiddleware } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Avaliacao:
 *       type: object
 *       required:
 *         - alunoId
 *         - eventoAvaliacaoId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da avaliação
 *         alunoId:
 *           type: integer
 *           description: ID do aluno avaliado
 *         eventoAvaliacaoId:
 *           type: integer
 *           description: ID do evento de avaliação
 *         aplicadorId:
 *           type: integer
 *           description: ID do usuário que aplicou a avaliação
 *         dataAplicacao:
 *           type: string
 *           format: date-time
 *           description: Data de aplicação da avaliação
 *         ppm:
 *           type: integer
 *           description: Palavras por minuto
 *         precisao:
 *           type: number
 *           format: float
 *           description: Precisão da leitura (0-100)
 *         prosadia:
 *           type: number
 *           format: float
 *           description: Prosódia da leitura (0-100)
 *         compreensao:
 *           type: number
 *           format: float
 *           description: Compreensão da leitura (0-100)
 *         observacoes:
 *           type: string
 *           description: Observações sobre a avaliação
 *         status:
 *           type: string
 *           enum: [PENDENTE, REALIZADA, CANCELADA]
 *           description: Status da avaliação
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
 * /api/avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 */
router.get('/', avaliacaoController.listarAvaliacoes);

/**
 * @swagger
 * /api/avaliacoes/{id}:
 *   get:
 *     summary: Retorna uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Detalhes da avaliação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:id', avaliacaoController.buscarAvaliacao);

/**
 * @swagger
 * /api/avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alunoId
 *               - eventoAvaliacaoId
 *             properties:
 *               alunoId:
 *                 type: integer
 *               eventoAvaliacaoId:
 *                 type: integer
 *               aplicadorId:
 *                 type: integer
 *               dataAplicacao:
 *                 type: string
 *                 format: date-time
 *               ppm:
 *                 type: integer
 *               precisao:
 *                 type: number
 *               prosadia:
 *                 type: number
 *               compreensao:
 *                 type: number
 *               observacoes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDENTE, REALIZADA, CANCELADA]
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', avaliacaoController.criarAvaliacao);

/**
 * @swagger
 * /api/avaliacoes/{id}:
 *   put:
 *     summary: Atualiza uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alunoId:
 *                 type: integer
 *               eventoAvaliacaoId:
 *                 type: integer
 *               aplicadorId:
 *                 type: integer
 *               dataAplicacao:
 *                 type: string
 *                 format: date-time
 *               ppm:
 *                 type: integer
 *               precisao:
 *                 type: number
 *               prosadia:
 *                 type: number
 *               compreensao:
 *                 type: number
 *               observacoes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDENTE, REALIZADA, CANCELADA]
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 */
router.put('/:id', avaliacaoController.atualizarAvaliacao);

/**
 * @swagger
 * /api/avaliacoes/{id}:
 *   delete:
 *     summary: Remove uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete('/:id', avaliacaoController.excluirAvaliacao);

module.exports = router; 