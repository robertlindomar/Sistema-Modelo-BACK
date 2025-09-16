-- ===============================
-- Tabela de Cidades
-- ===============================
CREATE TABLE cidade (
    id_cidade SERIAL PRIMARY KEY,
    nome_cidade VARCHAR(100) NOT NULL,
    uf_cidade CHAR(2) NOT NULL
);

-- ===============================
-- Tabela de Instituições
-- ===============================
CREATE TABLE instituicao (
    id_instituicao SERIAL PRIMARY KEY,
    nome_insti VARCHAR(100) NOT NULL,
    nome_fantasia_insti VARCHAR(100) NOT NULL,
    cnpj_insti CHAR(25),
    endereco_insti VARCHAR(150),
    cidade_id INTEGER NOT NULL REFERENCES cidade (id_cidade),
    telefone_insti VARCHAR(20),
    email_insti VARCHAR(100),
    diretor_nome VARCHAR(100),
    diretor_cpf CHAR(25)
);

-- ===============================
-- Tabela de Cursos
-- ===============================
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    nome_curso VARCHAR(100) NOT NULL,
    habilitacao VARCHAR(100),
    nivel VARCHAR(50)
);

-- ===============================
-- Tabela de Alunos
-- ===============================
CREATE TABLE aluno (
    id_aluno SERIAL PRIMARY KEY,
    nome_aluno VARCHAR(100) NOT NULL,
    rg_aluno VARCHAR(20),
    cpf_aluno CHAR(14),
    endereco_aluno VARCHAR(150),
    cidade_id INTEGER NOT NULL REFERENCES cidade (id_cidade),
    curso_id INTEGER NOT NULL REFERENCES curso (id_curso),
    serie VARCHAR(20),
    telefone_aluno VARCHAR(25),
    telefone_pai VARCHAR(25),
    email_aluno VARCHAR(100),
    dt_nascimento DATE
);

-- ===============================
-- Tabela de Empresas (Concedente ou Autônomo)
-- ===============================
CREATE TABLE empresa (
    id_empresa SERIAL PRIMARY KEY,
    nome_empresa VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100) NOT NULL,
    cnpj_empresa CHAR(25),
    cpf_autonomo CHAR(25),
    num_class_autonomo CHAR(25),
    endereco_empresa VARCHAR(150),
    cidade_id INTEGER NOT NULL REFERENCES cidade (id_cidade),
    telefone_empresa1 VARCHAR(20),
    telefone_empresa2 VARCHAR(20),
    email_empresa VARCHAR(100),
    representante VARCHAR(100),
    representante_cargo VARCHAR(50)
);

-- ===============================
-- Tabela de Seguradoras
-- ===============================
CREATE TABLE seguradora (
    id_seguradora SERIAL PRIMARY KEY,
    nome_seguradora VARCHAR(100) NOT NULL
);

-- ===============================
-- Tabela de Estágios
-- ===============================
CREATE TABLE estagio (
    id_estagio SERIAL PRIMARY KEY,
    aluno_id INTEGER NOT NULL REFERENCES aluno (id_aluno),
    empresa_id INTEGER NOT NULL REFERENCES empresa (id_empresa),
    curso_id INTEGER NOT NULL REFERENCES curso (id_curso),
    instituicao_id INTEGER NOT NULL REFERENCES instituicao (id_instituicao),
    tipo_estagio VARCHAR(20) NOT NULL CHECK (
        tipo_estagio IN (
            'Obrigatório',
            'Não Obrigatório'
        )
    ),
    remunerado BOOLEAN NOT NULL DEFAULT FALSE,
    origem_instituicao VARCHAR(100),
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL,
    carga_horaria_semanal INTEGER,
    bolsa_auxilio NUMERIC(10, 2),
    seguro_apolice VARCHAR(50),
    seguradora_id INTEGER REFERENCES seguradora (id_seguradora),
    status VARCHAR(20) DEFAULT 'Ativo' CHECK (
        status IN (
            'Ativo',
            'Cancelado',
            'Concluído'
        )
    ),
    data_assinatura DATE,
    data_cancelamento DATE,
    motivo_cancelamento VARCHAR(100),
    possui_responsavel_menor BOOLEAN DEFAULT FALSE
);

-- ===============================
-- Tabela para Horários de Estágio
-- ===============================
CREATE TABLE estagio_horario (
    id_estagio_horario SERIAL PRIMARY KEY,
    estagio_id INTEGER NOT NULL REFERENCES estagio (id_estagio),
    dia_semana VARCHAR(10) NOT NULL CHECK (
        dia_semana IN (
            'Domingo',
            'Segunda',
            'Terca',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sabado'
        )
    ),
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL
);

-- ===============================
-- Tabela para Relatórios de Estágio
-- ===============================
CREATE TABLE relatorio_estagio (
    id_relatorio SERIAL PRIMARY KEY,
    estagio_id INTEGER NOT NULL REFERENCES estagio (id_estagio),
    tipo_relatorio VARCHAR(10) NOT NULL CHECK (
        tipo_relatorio IN ('Inicial', 'Parcial', 'Final')
    ),
    prazo_entrega DATE NOT NULL,
    data_entregue DATE,
    observacao TEXT,
    CONSTRAINT uk_estagio_tipo UNIQUE (estagio_id, tipo_relatorio)
);