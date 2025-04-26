const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Listar todas as turmas
 */
const listarTurmas = async (req, res) => {
  try {
    const turmas = await prisma.turma.findMany({
      include: {
        escola: true,
        anoEscolar: true
      }
    });
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar turma por ID
 */
const buscarTurma = async (req, res) => {
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        escola: true,
        anoEscolar: true,
        alunos: true
      }
    });

    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }

    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Criar nova turma
 */
const criarTurma = async (req, res) => {
  try {
    const { nome, escolaId, anoEscolarId } = req.body;

    if (!nome || !escolaId || !anoEscolarId) {
      return res.status(400).json({ error: 'Nome, escola e ano escolar são obrigatórios' });
    }

    const turma = await prisma.turma.create({
      data: {
        nome,
        escolaId: parseInt(escolaId),
        anoEscolarId: parseInt(anoEscolarId)
      }
    });

    res.status(201).json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualizar turma existente
 */
const atualizarTurma = async (req, res) => {
  try {
    const { nome, escolaId, anoEscolarId } = req.body;
    const turmaId = parseInt(req.params.id);

    const turma = await prisma.turma.update({
      where: { id: turmaId },
      data: {
        nome,
        escolaId: escolaId ? parseInt(escolaId) : undefined,
        anoEscolarId: anoEscolarId ? parseInt(anoEscolarId) : undefined
      }
    });

    res.json(turma);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Excluir turma
 */
const excluirTurma = async (req, res) => {
  try {
    await prisma.turma.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Turma removida com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Turma não encontrada' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarTurmas,
  buscarTurma,
  criarTurma,
  atualizarTurma,
  excluirTurma
}; 