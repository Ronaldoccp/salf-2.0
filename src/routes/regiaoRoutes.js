const express = require('express');
const router = express.Router();
const regiaoController = require('../controllers/regiaoController');

/**
 * @swagger
 * /api/regioes:
 *   get:
 *     summary: Listar regiões
 *     description: Retorna uma lista de todas as regiões
 *     tags: [Regiões]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para busca por nome
 *     responses:
 *       200:
 *         description: Lista de regiões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   _count:
 *                     type: object
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', regiaoController.listarRegioes);

/**
 * @swagger
 * /api/regioes/{id}:
 *   get:
 *     summary: Buscar região por ID
 *     description: Retorna uma região pelo ID
 *     tags: [Regiões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da região
 *     responses:
 *       200:
 *         description: Região encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 escolas:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Região não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', regiaoController.buscarRegiao);

/**
 * @swagger
 * /api/regioes:
 *   post:
 *     summary: Criar região
 *     description: Cria uma nova região
 *     tags: [Regiões]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Região criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', regiaoController.criarRegiao);

/**
 * @swagger
 * /api/regioes/{id}:
 *   put:
 *     summary: Atualizar região
 *     description: Atualiza uma região existente
 *     tags: [Regiões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da região
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Região atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Região não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', regiaoController.atualizarRegiao);

/**
 * @swagger
 * /api/regioes/{id}:
 *   delete:
 *     summary: Excluir região
 *     description: Exclui uma região existente
 *     tags: [Regiões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da região
 *     responses:
 *       200:
 *         description: Região excluída com sucesso
 *       400:
 *         description: Não é possível excluir a região
 *       404:
 *         description: Região não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', regiaoController.excluirRegiao);

module.exports = router; 