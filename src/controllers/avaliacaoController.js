const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Listar todas as avaliações
 */
const listarAvaliacoes = async (req, res) => {
  try {
    const avaliacoes = await prisma.avaliacao.findMany({
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
        eventoAvaliacao: true,
        aplicador: true
      }
    });
    res.json(avaliacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar avaliação por ID
 */
const buscarAvaliacao = async (req, res) => {
  try {
    const avaliacao = await prisma.avaliacao.findUnique({
      where: { id: parseInt(req.params.id) },
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
        eventoAvaliacao: true,
        aplicador: true
      }
    });

    if (!avaliacao) {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }

    res.json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Criar nova avaliação
 */
const criarAvaliacao = async (req, res) => {
  try {
    const {
      alunoId,
      eventoAvaliacaoId,
      aplicadorId,
      dataAplicacao,
      ppm,
      precisao,
      prosadia,
      compreensao,
      observacoes,
      status
    } = req.body;

    if (!alunoId || !eventoAvaliacaoId) {
      return res.status(400).json({ error: 'Aluno e evento de avaliação são obrigatórios' });
    }

    const avaliacao = await prisma.avaliacao.create({
      data: {
        alunoId: parseInt(alunoId),
        eventoAvaliacaoId: parseInt(eventoAvaliacaoId),
        aplicadorId: aplicadorId ? parseInt(aplicadorId) : null,
        dataAplicacao: dataAplicacao ? new Date(dataAplicacao) : null,
        ppm: ppm ? parseInt(ppm) : null,
        precisao: precisao ? parseFloat(precisao) : null,
        prosadia: prosadia ? parseFloat(prosadia) : null,
        compreensao: compreensao ? parseFloat(compreensao) : null,
        observacoes,
        status: status || 'PENDENTE'
      }
    });

    res.status(201).json(avaliacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualizar avaliação existente
 */
const atualizarAvaliacao = async (req, res) => {
  try {
    const {
      alunoId,
      eventoAvaliacaoId,
      aplicadorId,
      dataAplicacao,
      ppm,
      precisao,
      prosadia,
      compreensao,
      observacoes,
      status
    } = req.body;
    
    const avaliacaoId = parseInt(req.params.id);

    const avaliacao = await prisma.avaliacao.update({
      where: { id: avaliacaoId },
      data: {
        alunoId: alunoId ? parseInt(alunoId) : undefined,
        eventoAvaliacaoId: eventoAvaliacaoId ? parseInt(eventoAvaliacaoId) : undefined,
        aplicadorId: aplicadorId ? parseInt(aplicadorId) : undefined,
        dataAplicacao: dataAplicacao ? new Date(dataAplicacao) : undefined,
        ppm: ppm !== undefined ? parseInt(ppm) : undefined,
        precisao: precisao !== undefined ? parseFloat(precisao) : undefined,
        prosadia: prosadia !== undefined ? parseFloat(prosadia) : undefined,
        compreensao: compreensao !== undefined ? parseFloat(compreensao) : undefined,
        observacoes,
        status
      }
    });

    res.json(avaliacao);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Excluir avaliação
 */
const excluirAvaliacao = async (req, res) => {
  try {
    await prisma.avaliacao.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Avaliação removida com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Avaliação não encontrada' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarAvaliacoes,
  buscarAvaliacao,
  criarAvaliacao,
  atualizarAvaliacao,
  excluirAvaliacao
}; 