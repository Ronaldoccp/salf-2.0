const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Listar todos os alunos
 */
const listarAlunos = async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany({
      include: {
        turma: {
          include: {
            escola: true,
            anoEscolar: true
          }
        }
      }
    });
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Buscar aluno por ID
 */
const buscarAluno = async (req, res) => {
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        turma: {
          include: {
            escola: true,
            anoEscolar: true
          }
        },
        avaliacoes: true
      }
    });

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Criar novo aluno
 */
const criarAluno = async (req, res) => {
  try {
    const { nome, dataNascimento, matricula, turmaId } = req.body;

    if (!nome || !turmaId) {
      return res.status(400).json({ error: 'Nome e turma são obrigatórios' });
    }

    const aluno = await prisma.aluno.create({
      data: {
        nome,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
        matricula,
        turmaId: parseInt(turmaId)
      }
    });

    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualizar aluno existente
 */
const atualizarAluno = async (req, res) => {
  try {
    const { nome, dataNascimento, matricula, turmaId } = req.body;
    const alunoId = parseInt(req.params.id);

    const aluno = await prisma.aluno.update({
      where: { id: alunoId },
      data: {
        nome,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        matricula,
        turmaId: turmaId ? parseInt(turmaId) : undefined
      }
    });

    res.json(aluno);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

/**
 * Excluir aluno
 */
const excluirAluno = async (req, res) => {
  try {
    await prisma.aluno.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Aluno removido com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarAlunos,
  buscarAluno,
  criarAluno,
  atualizarAluno,
  excluirAluno
}; 