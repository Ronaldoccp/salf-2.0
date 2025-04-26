const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Para uso em desenvolvimento, quando o banco de dados não estiver disponível
const MOCK_MODE = true;
const MOCK_USERS = [
  {
    id: 1,
    nome: 'Admin Sistema',
    email: 'admin@salf.edu.br',
    senha: '$2b$10$1aOAQgkqZ9VcnqL/4EF7UuNjOlIGt5cww.ObXP8OBUGSOL7GgfBt.', // senha123
    tipo: 'admin',
    ativo: true
  },
  {
    id: 2,
    nome: 'Maria Coordenadora',
    email: 'coordenador@salf.edu.br',
    senha: '$2b$10$1aOAQgkqZ9VcnqL/4EF7UuNjOlIGt5cww.ObXP8OBUGSOL7GgfBt.', // senha123
    tipo: 'coordenador',
    ativo: true
  },
  {
    id: 3,
    nome: 'João Aplicador',
    email: 'aplicador@salf.edu.br',
    senha: '$2b$10$1aOAQgkqZ9VcnqL/4EF7UuNjOlIGt5cww.ObXP8OBUGSOL7GgfBt.', // senha123
    tipo: 'aplicador',
    ativo: true
  },
  {
    id: 4,
    nome: 'Pedro Gestor',
    email: 'gestor@salf.edu.br',
    senha: '$2b$10$1aOAQgkqZ9VcnqL/4EF7UuNjOlIGt5cww.ObXP8OBUGSOL7GgfBt.', // senha123
    tipo: 'gestor',
    ativo: true
  }
];

const prisma = new PrismaClient();

/**
 * Autenticar um usuário
 */
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o email e senha foram fornecidos
    if (!email || !senha) {
      return res.status(400).json({
        error: 'Email e senha são obrigatórios',
      });
    }

    // Modo de desenvolvimento (mock)
    if (MOCK_MODE) {
      const mockUser = MOCK_USERS.find(user => user.email === email);
      
      if (!mockUser) {
        return res.status(401).json({
          error: 'Credenciais inválidas',
        });
      }

      // Verificar se o usuário está ativo
      if (!mockUser.ativo) {
        return res.status(403).json({
          error: 'Usuário inativo. Entre em contato com o administrador.',
        });
      }

      // Verificar a senha
      const senhaCorreta = await bcrypt.compare(senha, mockUser.senha);

      if (!senhaCorreta && senha !== 'senha123') { // Permitir senha123 diretamente para facilitar o desenvolvimento
        return res.status(401).json({
          error: 'Credenciais inválidas',
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          id: mockUser.id,
          email: mockUser.email,
          tipo: mockUser.tipo,
        },
        process.env.JWT_SECRET || 's4lf-s3cur3-j5on-w3b-t0k3n',
        {
          expiresIn: '24h',
        }
      );

      // Retornar o token e informações do usuário (sem a senha)
      return res.json({
        usuario: {
          id: mockUser.id,
          nome: mockUser.nome,
          email: mockUser.email,
          tipo: mockUser.tipo,
        },
        token,
      });
    }

    // Modo de produção (banco de dados real)
    // Buscar o usuário pelo email
    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    // Verificar se o usuário existe
    if (!usuario) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
      });
    }

    // Verificar se o usuário está ativo
    if (!usuario.ativo) {
      return res.status(403).json({
        error: 'Usuário inativo. Entre em contato com o administrador.',
      });
    }

    // Verificar a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      process.env.JWT_SECRET || 's4lf-s3cur3-j5on-w3b-t0k3n',
      {
        expiresIn: '24h',
      }
    );

    // Retornar o token e informações do usuário (sem a senha)
    return res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
      },
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};

/**
 * Verificar o token e retornar informações do usuário
 * Modificado para funcionar sem o middleware de autenticação
 */
const verificarToken = async (req, res) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Token de autenticação não fornecido'
      });
    }
    
    // O token vem como "Bearer <token>", então precisamos separar
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
      return res.status(401).json({
        error: 'Erro no formato do token'
      });
    }
    
    const [scheme, token] = parts;
    
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({
        error: 'Token mal formatado'
      });
    }
    
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 's4lf-s3cur3-j5on-w3b-t0k3n');
    
    if (MOCK_MODE) {
      // Buscar usuário pelo ID nos dados mockados
      const mockUser = MOCK_USERS.find(user => user.id === decoded.id);
      
      if (!mockUser) {
        return res.status(404).json({
          error: 'Usuário não encontrado',
        });
      }

      if (!mockUser.ativo) {
        return res.status(403).json({
          error: 'Usuário inativo',
        });
      }

      // Retornar o usuário sem a senha
      return res.json({
        id: mockUser.id,
        nome: mockUser.nome,
        email: mockUser.email,
        tipo: mockUser.tipo,
        ativo: mockUser.ativo
      });
    }
    
    // Buscar usuário pelo ID extraído do token
    const usuario = await prisma.usuario.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
        ativo: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
      });
    }

    if (!usuario.ativo) {
      return res.status(403).json({
        error: 'Usuário inativo',
      });
    }

    return res.json(usuario);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    console.error('Erro ao verificar token:', error);
    return res.status(500).json({
      error: 'Erro interno do servidor',
    });
  }
};

module.exports = {
  login,
  verificarToken,
}; 