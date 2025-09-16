-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_usuario` VARCHAR(100) NOT NULL,
    `email_usuario` VARCHAR(100) NOT NULL,
    `senha_usuario` VARCHAR(255) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_usuario_key`(`email_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidade` (
    `id_cidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_cidade` VARCHAR(100) NOT NULL,
    `uf_cidade` CHAR(2) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_cidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instituicao` (
    `id_instituicao` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_insti` VARCHAR(100) NOT NULL,
    `nome_fantasia_insti` VARCHAR(100) NOT NULL,
    `cnpj_insti` CHAR(18) NULL,
    `endereco_insti` VARCHAR(150) NULL,
    `cidade_id` INTEGER NOT NULL,
    `telefone_insti` VARCHAR(20) NULL,
    `email_insti` VARCHAR(100) NULL,
    `diretor_nome` VARCHAR(100) NULL,
    `diretor_cpf` CHAR(14) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_instituicao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curso` (
    `id_curso` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_curso` VARCHAR(100) NOT NULL,
    `habilitacao` VARCHAR(100) NULL,
    `nivel` VARCHAR(50) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_curso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno` (
    `id_aluno` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_aluno` VARCHAR(100) NOT NULL,
    `rg_aluno` VARCHAR(20) NULL,
    `cpf_aluno` CHAR(14) NULL,
    `endereco_aluno` VARCHAR(150) NULL,
    `cidade_id` INTEGER NOT NULL,
    `curso_id` INTEGER NOT NULL,
    `serie` VARCHAR(20) NULL,
    `telefone_aluno` VARCHAR(25) NULL,
    `telefone_pai` VARCHAR(25) NULL,
    `email_aluno` VARCHAR(100) NULL,
    `dt_nascimento` DATETIME(3) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_aluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empresa` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_empresa` VARCHAR(100) NOT NULL,
    `nome_fantasia` VARCHAR(100) NOT NULL,
    `cnpj_empresa` CHAR(18) NULL,
    `cpf_autonomo` CHAR(14) NULL,
    `num_class_autonomo` CHAR(25) NULL,
    `endereco_empresa` VARCHAR(150) NULL,
    `cidade_id` INTEGER NOT NULL,
    `telefone_empresa1` VARCHAR(20) NULL,
    `telefone_empresa2` VARCHAR(20) NULL,
    `email_empresa` VARCHAR(100) NULL,
    `representante` VARCHAR(100) NULL,
    `representante_cargo` VARCHAR(50) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seguradora` (
    `id_seguradora` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_seguradora` VARCHAR(100) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_seguradora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estagio` (
    `id_estagio` INTEGER NOT NULL AUTO_INCREMENT,
    `aluno_id` INTEGER NOT NULL,
    `empresa_id` INTEGER NOT NULL,
    `instituicao_id` INTEGER NOT NULL,
    `tipo_estagio` ENUM('Obrigatório', 'Não Obrigatório') NOT NULL,
    `remunerado` BOOLEAN NOT NULL DEFAULT false,
    `origem_instituicao` VARCHAR(100) NULL,
    `data_inicio` DATETIME(3) NOT NULL,
    `data_termino` DATETIME(3) NOT NULL,
    `carga_horaria_semanal` INTEGER NULL,
    `bolsa_auxilio` DECIMAL(10, 2) NULL,
    `seguro_apolice` VARCHAR(50) NULL,
    `seguradora_id` INTEGER NULL,
    `status` ENUM('Ativo', 'Cancelado', 'Concluído') NOT NULL DEFAULT 'Ativo',
    `data_assinatura` DATETIME(3) NULL,
    `data_cancelamento` DATETIME(3) NULL,
    `possui_responsavel_menor` BOOLEAN NOT NULL DEFAULT false,
    `motivo_encerramento_id` INTEGER NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,
    `cursoId` INTEGER NULL,

    PRIMARY KEY (`id_estagio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `motivo_encerramento_estagio` (
    `id_motivo_encerramento` INTEGER NOT NULL AUTO_INCREMENT,
    `estagio_id` INTEGER NOT NULL,
    `motivo_principal` VARCHAR(255) NOT NULL,
    `motivo_principal_outros` VARCHAR(191) NULL,
    `motivos_empresa` VARCHAR(191) NULL,
    `motivos_empresa_outros` VARCHAR(191) NULL,
    `data_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `motivo_encerramento_estagio_estagio_id_key`(`estagio_id`),
    PRIMARY KEY (`id_motivo_encerramento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estagio_horario` (
    `id_estagio_horario` INTEGER NOT NULL AUTO_INCREMENT,
    `estagio_id` INTEGER NOT NULL,
    `dia_semana` ENUM('Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado') NOT NULL,
    `horario_inicio` DATETIME(3) NOT NULL,
    `horario_fim` DATETIME(3) NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_estagio_horario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relatorio_estagio` (
    `id_relatorio` INTEGER NOT NULL AUTO_INCREMENT,
    `estagio_id` INTEGER NOT NULL,
    `tipo_relatorio` ENUM('Inicial', 'Parcial', 'Final') NOT NULL,
    `prazo_entrega` DATETIME(3) NOT NULL,
    `data_entregue` DATETIME(3) NULL,
    `observacao` VARCHAR(191) NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL,

    UNIQUE INDEX `relatorio_estagio_estagio_id_tipo_relatorio_key`(`estagio_id`, `tipo_relatorio`),
    PRIMARY KEY (`id_relatorio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instituicao` ADD CONSTRAINT `instituicao_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id_cidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id_cidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso`(`id_curso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `empresa` ADD CONSTRAINT `empresa_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade`(`id_cidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio` ADD CONSTRAINT `estagio_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `aluno`(`id_aluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio` ADD CONSTRAINT `estagio_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio` ADD CONSTRAINT `estagio_instituicao_id_fkey` FOREIGN KEY (`instituicao_id`) REFERENCES `instituicao`(`id_instituicao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio` ADD CONSTRAINT `estagio_seguradora_id_fkey` FOREIGN KEY (`seguradora_id`) REFERENCES `seguradora`(`id_seguradora`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio` ADD CONSTRAINT `estagio_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `curso`(`id_curso`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `motivo_encerramento_estagio` ADD CONSTRAINT `motivo_encerramento_estagio_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio`(`id_estagio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estagio_horario` ADD CONSTRAINT `estagio_horario_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio`(`id_estagio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relatorio_estagio` ADD CONSTRAINT `relatorio_estagio_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio`(`id_estagio`) ON DELETE RESTRICT ON UPDATE CASCADE;
