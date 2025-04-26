const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Carrega as variáveis de ambiente
dotenv.config();

// Importa as rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const escolaRoutes = require('./routes/escolaRoutes');
const regiaoRoutes = require('./routes/regiaoRoutes');
const grupoRoutes = require('./routes/grupoRoutes');
const turmaRoutes = require('./routes/turmaRoutes');
const alunoRoutes = require('./routes/alunoRoutes');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const eventoAvaliacaoRoutes = require('./routes/eventoAvaliacaoRoutes');
const anoEscolarRoutes = require('./routes/anoEscolarRoutes');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SALF API',
      version: '1.0.0',
      description: 'API do Sistema de Avaliação, Leitura e Fluência',
      contact: {
        name: 'Equipe SALF',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 4000}`,
          description: 'Servidor de Desenvolvimento',
        },
      ],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Inicialização da aplicação
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/escolas', escolaRoutes);
app.use('/api/regioes', regiaoRoutes);
app.use('/api/grupos', grupoRoutes);
app.use('/api/turmas', turmaRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/avaliacoes', avaliacaoRoutes);
app.use('/api/eventos-avaliacao', eventoAvaliacaoRoutes);
app.use('/api/anos-escolares', anoEscolarRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API do SALF - Sistema de Avaliação, Leitura e Fluência',
    docsUrl: '/api-docs',
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 