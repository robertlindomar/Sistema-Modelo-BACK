-- ===============================
-- Tabela de Cidades
-- ===============================
CREATE TABLE cidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL
);

-- ===============================
-- Tabela de Instituições
-- ===============================
CREATE TABLE instituicao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100) NOT NULL,
    cnpj CHAR(18),
    endereco VARCHAR(150),
    cidade_id INT NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    nome_diretor VARCHAR(100),
    cpf_diretor CHAR(14),
    FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

-- ===============================
-- Tabela de Cursos
-- ===============================
CREATE TABLE curso (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    habilitacao VARCHAR(100),
    nivel VARCHAR(50)
);

-- ===============================
-- Tabela de Alunos
-- ===============================
CREATE TABLE aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    rg VARCHAR(20),
    cpf CHAR(14),
    endereco VARCHAR(150),
    cidade_id INT NOT NULL,
    curso_id INT NOT NULL,
    serie VARCHAR(20),
    telefone VARCHAR(25),
    telefone_pai VARCHAR(25),
    email VARCHAR(100),
    data_nascimento DATE,
    FOREIGN KEY (cidade_id) REFERENCES cidade (id),
    FOREIGN KEY (curso_id) REFERENCES curso (id)
);

-- ===============================
-- Tabela de Empresas (Concedente ou Autônomo)
-- ===============================
CREATE TABLE empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Concedente', 'Autônomo') NOT NULL,
    nome VARCHAR(100) NOT NULL,
    nome_fantasia VARCHAR(100),
    cnpj CHAR(18),
    cpf CHAR(14),
    numero_classificacao CHAR(25),
    endereco VARCHAR(150),
    cidade_id INT NOT NULL,
    telefone1 VARCHAR(20),
    telefone2 VARCHAR(20),
    email VARCHAR(100),
    representante VARCHAR(100),
    cargo_representante VARCHAR(50),
    FOREIGN KEY (cidade_id) REFERENCES cidade (id)
);

-- ===============================
-- Tabela de Seguradoras
-- ===============================
CREATE TABLE seguradora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- ===============================
-- Tabela de Estágios
-- ===============================
CREATE TABLE estagio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    empresa_id INT NOT NULL,
    curso_id INT NOT NULL,
    instituicao_id INT NOT NULL,
    tipo ENUM(
        'Obrigatório',
        'Não Obrigatório'
    ) NOT NULL,
    remunerado BOOLEAN NOT NULL DEFAULT FALSE,
    origem_instituicao VARCHAR(100),
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL,
    carga_horaria_semanal INT,
    bolsa_auxilio DECIMAL(10, 2),
    seguro_apolice VARCHAR(50),
    seguradora_id INT,
    status ENUM(
        'Ativo',
        'Cancelado',
        'Concluído'
    ) DEFAULT 'Ativo',
    data_assinatura DATE,
    data_cancelamento DATE,
    motivo_cancelamento VARCHAR(100),
    possui_responsavel_menor BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (aluno_id) REFERENCES aluno (id),
    FOREIGN KEY (empresa_id) REFERENCES empresa (id),
    FOREIGN KEY (curso_id) REFERENCES curso (id),
    FOREIGN KEY (instituicao_id) REFERENCES instituicao (id),
    FOREIGN KEY (seguradora_id) REFERENCES seguradora (id),
    CHECK (
        (
            status = 'Cancelado'
            AND data_cancelamento IS NOT NULL
            AND motivo_cancelamento IS NOT NULL
        )
        OR status != 'Cancelado'
    )
);

-- ===============================
-- Tabela para Horários de Estágio
-- ===============================
CREATE TABLE estagio_horario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estagio_id INT NOT NULL,
    dia_semana ENUM(
        'Domingo',
        'Segunda',
        'Terca',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sabado'
    ) NOT NULL,
    horario_inicio TIME NOT NULL,
    horario_fim TIME NOT NULL,
    FOREIGN KEY (estagio_id) REFERENCES estagio (id)
);

-- ===============================
-- Tabela para Relatórios de Estágio
-- ===============================
CREATE TABLE relatorio_estagio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estagio_id INT NOT NULL,
    tipo ENUM('Inicial', 'Parcial', 'Final') NOT NULL,
    prazo_entrega DATE NOT NULL,
    data_entregue DATE,
    observacao TEXT,
    FOREIGN KEY (estagio_id) REFERENCES estagio (id),
    UNIQUE (estagio_id, tipo)
);