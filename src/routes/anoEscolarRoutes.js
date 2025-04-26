const express = require('express');
const router = express.Router();
const anoEscolarController = require('../controllers/anoEscolarController');

/**
 * @swagger
 * components:
 *   schemas:
 *     AnoEscolar:
 *       type: object
 *       required:
 *         - nome
 *         - nivel
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do ano escolar
 *         nome:
 *           type: string
 *           description: Nome do ano escolar
 *         nivel:
 *           type: string
 *           enum: [INFANTIL, FUNDAMENTAL_I, FUNDAMENTAL_II, MEDIO]
 *           description: Nivel do ano escolar
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criacao
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualizacao
 */

/**
 * @swagger
 * /api/anos-escolares:
 *   get:
 *     summary: Retorna todos os anos escolares
 *     tags: [Anos Escolares]
 *     responses:
 *       200:
 *         description: Lista de anos escolares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AnoEscolar'
 */
router.get('/', anoEscolarController.listarAnosEscolares);

/**
 * @swagger
 * /api/anos-escolares/{id}:
 *   get:
 *     summary: Retorna um ano escolar pelo ID
 *     tags: [Anos Escolares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ano escolar
 *     responses:
 *       200:
 *         description: Detalhes do ano escolar
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AnoEscolar'
 *       404:
 *         description: Ano escolar não encontrado
 */
router.get('/:id', anoEscolarController.buscarAnoEscolar);

/**
 * @swagger
 * /api/anos-escolares:
 *   post:
 *     summary: Cria um novo ano escolar
 *     tags: [Anos Escolares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - nivel
 *             properties:
 *               nome:
 *                 type: string
 *               nivel:
 *                 type: string
 *                 enum: [INFANTIL, FUNDAMENTAL_I, FUNDAMENTAL_II, MEDIO]
 *     responses:
 *       201:
 *         description: Ano escolar criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', anoEscolarController.criarAnoEscolar);

/**
 * @swagger
 * /api/anos-escolares/{id}:
 *   put:
 *     summary: Atualiza um ano escolar pelo ID
 *     tags: [Anos Escolares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ano escolar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               nivel:
 *                 type: string
 *                 enum: [INFANTIL, FUNDAMENTAL_I, FUNDAMENTAL_II, MEDIO]
 *     responses:
 *       200:
 *         description: Ano escolar atualizado com sucesso
 *       404:
 *         description: Ano escolar não encontrado
 */
router.put('/:id', anoEscolarController.atualizarAnoEscolar);

/**
 * @swagger
 * /api/anos-escolares/{id}:
 *   delete:
 *     summary: Remove um ano escolar pelo ID
 *     tags: [Anos Escolares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ano escolar
 *     responses:
 *       200:
 *         description: Ano escolar removido com sucesso
 *       404:
 *         description: Ano escolar não encontrado
 */
router.delete('/:id', anoEscolarController.excluirAnoEscolar);

module.exports = router; 