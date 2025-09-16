-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 12/08/2025 às 22:17
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sistema_estagio`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `nome_aluno` varchar(100) NOT NULL,
  `rg_aluno` varchar(20) DEFAULT NULL,
  `cpf_aluno` char(14) DEFAULT NULL,
  `endereco_aluno` varchar(150) DEFAULT NULL,
  `cidade_id` int(11) NOT NULL,
  `curso_id` int(11) NOT NULL,
  `serie` varchar(20) DEFAULT NULL,
  `telefone_aluno` varchar(25) DEFAULT NULL,
  `telefone_pai` varchar(25) DEFAULT NULL,
  `email_aluno` varchar(100) DEFAULT NULL,
  `dt_nascimento` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidade`
--

CREATE TABLE `cidade` (
  `id_cidade` int(11) NOT NULL,
  `nome_cidade` varchar(100) NOT NULL,
  `uf_cidade` char(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `id_curso` int(11) NOT NULL,
  `nome_curso` varchar(100) NOT NULL,
  `habilitacao` varchar(100) DEFAULT NULL,
  `nivel` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `id_empresa` int(11) NOT NULL,
  `nome_empresa` varchar(100) NOT NULL,
  `nome_fantasia` varchar(100) NOT NULL,
  `cnpj_empresa` char(18) DEFAULT NULL,
  `cpf_autonomo` char(14) DEFAULT NULL,
  `num_class_autonomo` char(25) DEFAULT NULL,
  `endereco_empresa` varchar(150) DEFAULT NULL,
  `cidade_id` int(11) NOT NULL,
  `telefone_empresa1` varchar(20) DEFAULT NULL,
  `telefone_empresa2` varchar(20) DEFAULT NULL,
  `email_empresa` varchar(100) DEFAULT NULL,
  `representante` varchar(100) DEFAULT NULL,
  `representante_cargo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estagio`
--

CREATE TABLE `estagio` (
  `id_estagio` int(11) NOT NULL,
  `aluno_id` int(11) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `instituicao_id` int(11) NOT NULL,
  `tipo_estagio` enum('Obrigatório','Não Obrigatório') NOT NULL,
  `remunerado` tinyint(1) NOT NULL DEFAULT 0,
  `origem_instituicao` varchar(100) DEFAULT NULL,
  `data_inicio` datetime(3) NOT NULL,
  `data_termino` datetime(3) NOT NULL,
  `carga_horaria_semanal` int(11) DEFAULT NULL,
  `bolsa_auxilio` decimal(10,2) DEFAULT NULL,
  `seguro_apolice` varchar(50) DEFAULT NULL,
  `seguradora_id` int(11) DEFAULT NULL,
  `status` enum('Ativo','Cancelado','Concluído') NOT NULL DEFAULT 'Ativo',
  `data_assinatura` datetime(3) DEFAULT NULL,
  `data_cancelamento` datetime(3) DEFAULT NULL,
  `possui_responsavel_menor` tinyint(1) NOT NULL DEFAULT 0,
  `cursoId` int(11) DEFAULT NULL,
  `motivo_encerramento_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estagio_horario`
--

CREATE TABLE `estagio_horario` (
  `id_estagio_horario` int(11) NOT NULL,
  `estagio_id` int(11) NOT NULL,
  `dia_semana` enum('Domingo','Segunda','Terca','Quarta','Quinta','Sexta','Sabado') NOT NULL,
  `horario_inicio` datetime(3) NOT NULL,
  `horario_fim` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `instituicao`
--

CREATE TABLE `instituicao` (
  `id_instituicao` int(11) NOT NULL,
  `nome_insti` varchar(100) NOT NULL,
  `nome_fantasia_insti` varchar(100) NOT NULL,
  `cnpj_insti` char(18) DEFAULT NULL,
  `endereco_insti` varchar(150) DEFAULT NULL,
  `cidade_id` int(11) NOT NULL,
  `telefone_insti` varchar(20) DEFAULT NULL,
  `email_insti` varchar(100) DEFAULT NULL,
  `diretor_nome` varchar(100) DEFAULT NULL,
  `diretor_cpf` char(14) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `motivo_encerramento_estagio`
--

CREATE TABLE `motivo_encerramento_estagio` (
  `id_motivo_encerramento` int(11) NOT NULL,
  `estagio_id` int(11) NOT NULL,
  `motivo_principal` varchar(255) NOT NULL,
  `motivo_principal_outros` varchar(191) DEFAULT NULL,
  `motivos_empresa` varchar(191) DEFAULT NULL,
  `motivos_empresa_outros` varchar(191) DEFAULT NULL,
  `data_registro` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `relatorio_estagio`
--

CREATE TABLE `relatorio_estagio` (
  `id_relatorio` int(11) NOT NULL,
  `estagio_id` int(11) NOT NULL,
  `tipo_relatorio` enum('Inicial','Parcial','Final') NOT NULL,
  `prazo_entrega` datetime(3) NOT NULL,
  `data_entregue` datetime(3) DEFAULT NULL,
  `observacao` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `seguradora`
--

CREATE TABLE `seguradora` (
  `id_seguradora` int(11) NOT NULL,
  `nome_seguradora` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome_usuario` varchar(100) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `senha_usuario` varchar(255) NOT NULL,
  `data_criacao` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome_usuario`, `email_usuario`, `senha_usuario`, `data_criacao`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$92ZC.9cYc1QcYR/NLtmh1OpSU0kbFYFMWwtq37KTmdqNSEGdNLJ4y', '2025-06-30 18:12:26.261');

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('7661270f-adcf-43d8-aeeb-2a38acc3780b', '3f30567aa1035217e5bba5c12410abb33af2c5ab2360bfd4a97328bfd1ee7ee1', '2025-08-12 20:13:18.138', '20250725153447_motivo_encerramento_estagio', NULL, NULL, '2025-08-12 20:13:18.109', 1),
('87568453-1fb7-471b-9586-d60474ce333f', '66ebd02cc4543bbd06b59a8c2a87cfa7b73615be2e321486e25320cc8cb87a8a', '2025-08-12 20:13:18.062', '20250626131138_init', NULL, NULL, '2025-08-12 20:13:17.763', 1),
('c8702fdc-4670-4094-b333-f3a61fa2daa7', 'b36203560739a57439a5ab299e26f126a4ef4e20a80d74787a37cf7a953e2d7b', '2025-08-12 20:13:18.071', '20250630165650_init', NULL, NULL, '2025-08-12 20:13:18.063', 1),
('ec9b4d68-3c5a-42a0-a8b9-e4502df5e8c3', 'bb0d71e3e3a467cb2be9885eb1df42cd144722c9b570f3db4a6bc36e7512c465', '2025-08-12 20:13:18.108', '20250708232239_init', NULL, NULL, '2025-08-12 20:13:18.072', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id_aluno`),
  ADD KEY `aluno_cidade_id_fkey` (`cidade_id`),
  ADD KEY `aluno_curso_id_fkey` (`curso_id`);

--
-- Índices de tabela `cidade`
--
ALTER TABLE `cidade`
  ADD PRIMARY KEY (`id_cidade`);

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`);

--
-- Índices de tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD KEY `empresa_cidade_id_fkey` (`cidade_id`);

--
-- Índices de tabela `estagio`
--
ALTER TABLE `estagio`
  ADD PRIMARY KEY (`id_estagio`),
  ADD KEY `estagio_aluno_id_fkey` (`aluno_id`),
  ADD KEY `estagio_empresa_id_fkey` (`empresa_id`),
  ADD KEY `estagio_instituicao_id_fkey` (`instituicao_id`),
  ADD KEY `estagio_seguradora_id_fkey` (`seguradora_id`),
  ADD KEY `estagio_cursoId_fkey` (`cursoId`);

--
-- Índices de tabela `estagio_horario`
--
ALTER TABLE `estagio_horario`
  ADD PRIMARY KEY (`id_estagio_horario`),
  ADD KEY `estagio_horario_estagio_id_fkey` (`estagio_id`);

--
-- Índices de tabela `instituicao`
--
ALTER TABLE `instituicao`
  ADD PRIMARY KEY (`id_instituicao`),
  ADD KEY `instituicao_cidade_id_fkey` (`cidade_id`);

--
-- Índices de tabela `motivo_encerramento_estagio`
--
ALTER TABLE `motivo_encerramento_estagio`
  ADD PRIMARY KEY (`id_motivo_encerramento`),
  ADD UNIQUE KEY `motivo_encerramento_estagio_estagio_id_key` (`estagio_id`);

--
-- Índices de tabela `relatorio_estagio`
--
ALTER TABLE `relatorio_estagio`
  ADD PRIMARY KEY (`id_relatorio`),
  ADD UNIQUE KEY `relatorio_estagio_estagio_id_tipo_relatorio_key` (`estagio_id`,`tipo_relatorio`);

--
-- Índices de tabela `seguradora`
--
ALTER TABLE `seguradora`
  ADD PRIMARY KEY (`id_seguradora`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `Usuario_email_usuario_key` (`email_usuario`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id_aluno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `cidade`
--
ALTER TABLE `cidade`
  MODIFY `id_cidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estagio`
--
ALTER TABLE `estagio`
  MODIFY `id_estagio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estagio_horario`
--
ALTER TABLE `estagio_horario`
  MODIFY `id_estagio_horario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `instituicao`
--
ALTER TABLE `instituicao`
  MODIFY `id_instituicao` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `motivo_encerramento_estagio`
--
ALTER TABLE `motivo_encerramento_estagio`
  MODIFY `id_motivo_encerramento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `relatorio_estagio`
--
ALTER TABLE `relatorio_estagio`
  MODIFY `id_relatorio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `seguradora`
--
ALTER TABLE `seguradora`
  MODIFY `id_seguradora` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id_cidade`) ON UPDATE CASCADE,
  ADD CONSTRAINT `aluno_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `curso` (`id_curso`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id_cidade`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `estagio`
--
ALTER TABLE `estagio`
  ADD CONSTRAINT `estagio_aluno_id_fkey` FOREIGN KEY (`aluno_id`) REFERENCES `aluno` (`id_aluno`) ON UPDATE CASCADE,
  ADD CONSTRAINT `estagio_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `curso` (`id_curso`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `estagio_empresa_id_fkey` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id_empresa`) ON UPDATE CASCADE,
  ADD CONSTRAINT `estagio_instituicao_id_fkey` FOREIGN KEY (`instituicao_id`) REFERENCES `instituicao` (`id_instituicao`) ON UPDATE CASCADE,
  ADD CONSTRAINT `estagio_seguradora_id_fkey` FOREIGN KEY (`seguradora_id`) REFERENCES `seguradora` (`id_seguradora`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Restrições para tabelas `estagio_horario`
--
ALTER TABLE `estagio_horario`
  ADD CONSTRAINT `estagio_horario_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio` (`id_estagio`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `instituicao`
--
ALTER TABLE `instituicao`
  ADD CONSTRAINT `instituicao_cidade_id_fkey` FOREIGN KEY (`cidade_id`) REFERENCES `cidade` (`id_cidade`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `motivo_encerramento_estagio`
--
ALTER TABLE `motivo_encerramento_estagio`
  ADD CONSTRAINT `motivo_encerramento_estagio_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio` (`id_estagio`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `relatorio_estagio`
--
ALTER TABLE `relatorio_estagio`
  ADD CONSTRAINT `relatorio_estagio_estagio_id_fkey` FOREIGN KEY (`estagio_id`) REFERENCES `estagio` (`id_estagio`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
