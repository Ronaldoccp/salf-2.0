const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Listar todos os eventos de avaliação
 */
const listarEventosAvaliacao = async (req, res) => {
  try {
    const eventos = await prisma.eventoAvaliacao.findMany({
      include: {
        avaliacoes: true
      }
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar evento de avaliação por ID
 */
const buscarEventoAvaliacao = async (req, res) => {
  try {
    const evento = await prisma.eventoAvaliacao.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        avaliacoes: {
          include: {
            aluno: {
              include: {
                turma: {
                  include: {
                    escola: true,
                    anoEscolar: true
                  }
                }
              }
            },
            aplicador: true
          }
        }
      }
    });

    if (!evento) {
      return res.status(404).json({ error: 'Evento de avaliação não encontrado' });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Criar novo evento de avaliação
 */
const criarEventoAvaliacao = async (req, res) => {
  try {
    const { nome, descricao, dataInicio, dataFim, status } = req.body;

    if (!nome || !dataInicio || !dataFim) {
      return res.status(400).json({ error: 'Nome, data de início e data de fim são obrigatórios' });
    }

    const evento = await prisma.eventoAvaliacao.create({
      data: {
        nome,
        descricao,
        dataInicio: new Date(dataInicio),
        dataFim: new Date(dataFim),
        status: status || 'PLANEJADO'
      }
    });

    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualizar evento de avaliação existente
 */
const atualizarEventoAvaliacao = async (req, res) => {
  try {
    const { nome, descricao, dataInicio, dataFim, status } = req.body;
    const eventoId = parseInt(req.params.id);

    const evento = await prisma.eventoAvaliacao.update({
      where: { id: eventoId },
      data: {
        nome,
        descricao,
        dataInicio: dataInicio ? new Date(dataInicio) : undefined,
        dataFim: dataFim ? new Date(dataFim) : undefined,
        status
      }
    });

    res.json(evento);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento de avaliação não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Excluir evento de avaliação
 */
const excluirEventoAvaliacao = async (req, res) => {
  try {
    await prisma.eventoAvaliacao.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Evento de avaliação removido com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento de avaliação não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarEventosAvaliacao,
  buscarEventoAvaliacao,
  criarEventoAvaliacao,
  atualizarEventoAvaliacao,
  excluirEventoAvaliacao
}; 