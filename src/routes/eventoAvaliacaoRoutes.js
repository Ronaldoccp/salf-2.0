const express = require('express');
const router = express.Router();
const eventoAvaliacaoController = require('../controllers/eventoAvaliacaoController');
// Removendo a autenticação conforme solicitado
// const { authMiddleware, isCoordenadorOrAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     EventoAvaliacao:
 *       type: object
 *       required:
 *         - nome
 *         - dataInicio
 *         - dataFim
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do evento de avaliação
 *         nome:
 *           type: string
 *           description: Nome do evento de avaliação
 *         descricao:
 *           type: string
 *           description: Descrição do evento
 *         dataInicio:
 *           type: string
 *           format: date
 *           description: Data de início do evento
 *         dataFim:
 *           type: string
 *           format: date
 *           description: Data de término do evento
 *         status:
 *           type: string
 *           enum: [PLANEJADO, EM_ANDAMENTO, CONCLUIDO, CANCELADO]
 *           description: Status do evento
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
 * /api/eventos-avaliacao:
 *   get:
 *     summary: Retorna todos os eventos de avaliação
 *     tags: [Eventos de Avaliação]
 *     responses:
 *       200:
 *         description: Lista de eventos de avaliação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventoAvaliacao'
 */
router.get('/', eventoAvaliacaoController.listarEventosAvaliacao);

/**
 * @swagger
 * /api/eventos-avaliacao/{id}:
 *   get:
 *     summary: Retorna um evento de avaliação pelo ID
 *     tags: [Eventos de Avaliação]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento de avaliação
 *     responses:
 *       200:
 *         description: Detalhes do evento de avaliação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventoAvaliacao'
 *       404:
 *         description: Evento de avaliação não encontrado
 */
router.get('/:id', eventoAvaliacaoController.buscarEventoAvaliacao);

/**
 * @swagger
 * /api/eventos-avaliacao:
 *   post:
 *     summary: Cria um novo evento de avaliação
 *     tags: [Eventos de Avaliação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - dataInicio
 *               - dataFim
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataInicio:
 *                 type: string
 *                 format: date
 *               dataFim:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PLANEJADO, EM_ANDAMENTO, CONCLUIDO, CANCELADO]
 *     responses:
 *       201:
 *         description: Evento de avaliação criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', eventoAvaliacaoController.criarEventoAvaliacao);

/**
 * @swagger
 * /api/eventos-avaliacao/{id}:
 *   put:
 *     summary: Atualiza um evento de avaliação pelo ID
 *     tags: [Eventos de Avaliação]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento de avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataInicio:
 *                 type: string
 *                 format: date
 *               dataFim:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PLANEJADO, EM_ANDAMENTO, CONCLUIDO, CANCELADO]
 *     responses:
 *       200:
 *         description: Evento de avaliação atualizado com sucesso
 *       404:
 *         description: Evento de avaliação não encontrado
 */
router.put('/:id', eventoAvaliacaoController.atualizarEventoAvaliacao);

/**
 * @swagger
 * /api/eventos-avaliacao/{id}:
 *   delete:
 *     summary: Remove um evento de avaliação pelo ID
 *     tags: [Eventos de Avaliação]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento de avaliação
 *     responses:
 *       200:
 *         description: Evento de avaliação removido com sucesso
 *       404:
 *         description: Evento de avaliação não encontrado
 */
router.delete('/:id', eventoAvaliacaoController.excluirEventoAvaliacao);

module.exports = router; 