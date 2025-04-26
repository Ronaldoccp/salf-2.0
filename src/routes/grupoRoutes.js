const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoController');
// Removendo a autenticação conforme solicitado
// const { authMiddleware, isCoordenadorOrAdmin } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/grupos:
 *   get:
 *     summary: Listar grupos
 *     description: Retorna uma lista de todos os grupos
 *     tags: [Grupos]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Texto para busca por nome
 *     responses:
 *       200:
 *         description: Lista de grupos
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
router.get('/', grupoController.listarGrupos);

/**
 * @swagger
 * /api/grupos/{id}:
 *   get:
 *     summary: Buscar grupo por ID
 *     description: Retorna um grupo pelo ID
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Grupo encontrado
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
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', grupoController.buscarGrupo);

/**
 * @swagger
 * /api/grupos:
 *   post:
 *     summary: Criar grupo
 *     description: Cria um novo grupo
 *     tags: [Grupos]
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
 *         description: Grupo criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', grupoController.criarGrupo);

/**
 * @swagger
 * /api/grupos/{id}:
 *   put:
 *     summary: Atualizar grupo
 *     description: Atualiza um grupo existente
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
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
 *         description: Grupo atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', grupoController.atualizarGrupo);

/**
 * @swagger
 * /api/grupos/{id}:
 *   delete:
 *     summary: Excluir grupo
 *     description: Exclui um grupo existente
 *     tags: [Grupos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do grupo
 *     responses:
 *       200:
 *         description: Grupo excluído com sucesso
 *       400:
 *         description: Não é possível excluir o grupo
 *       404:
 *         description: Grupo não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', grupoController.excluirGrupo);

module.exports = router; 