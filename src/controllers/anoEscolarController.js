const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Listar todos os anos escolares
 */
const listarAnosEscolares = async (req, res) => {
  try {
    const anosEscolares = await prisma.anoEscolar.findMany();
    res.json(anosEscolares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar ano escolar por ID
 */
const buscarAnoEscolar = async (req, res) => {
  try {
    const anoEscolar = await prisma.anoEscolar.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        turmas: true
      }
    });

    if (!anoEscolar) {
      return res.status(404).json({ error: 'Ano escolar não encontrado' });
    }

    res.json(anoEscolar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Criar novo ano escolar
 */
const criarAnoEscolar = async (req, res) => {
  try {
    const { nome, nivel } = req.body;

    if (!nome || !nivel) {
      return res.status(400).json({ error: 'Nome e nível são obrigatórios' });
    }

    const anoEscolar = await prisma.anoEscolar.create({
      data: {
        nome,
        nivel
      }
    });

    res.status(201).json(anoEscolar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualizar ano escolar existente
 */
const atualizarAnoEscolar = async (req, res) => {
  try {
    const { nome, nivel } = req.body;
    const anoEscolarId = parseInt(req.params.id);

    const anoEscolar = await prisma.anoEscolar.update({
      where: { id: anoEscolarId },
      data: {
        nome,
        nivel
      }
    });

    res.json(anoEscolar);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ano escolar não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Excluir ano escolar
 */
const excluirAnoEscolar = async (req, res) => {
  try {
    await prisma.anoEscolar.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Ano escolar removido com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Ano escolar não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarAnosEscolares,
  buscarAnoEscolar,
  criarAnoEscolar,
  atualizarAnoEscolar,
  excluirAnoEscolar
}; 