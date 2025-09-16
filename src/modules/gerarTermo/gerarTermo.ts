import { PrismaClient, DiaSemana } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

const prisma = new PrismaClient();

// Interface para os dados completos do estágio
interface DadosEstagioCompleto {
    // Dados da Empresa (Concedente)
    empresa_nome: string;
    empresa_endereco: string;
    empresa_cidade: string;
    empresa_uf: string;
    empresa_cnpj: string;
    
    // Dados do Aluno (Estagiário)
    aluno_nome: string;
    aluno_rg: string;
    aluno_cpf: string;
    aluno_endereco: string;
    aluno_cidade: string;
    aluno_uf: string;
    aluno_serie: string;
    
    // Dados do Curso
    curso_habilitacao: string;
    
    // Dados da Instituição
    instituicao_nome: string;
    instituicao_cidade: string;
    
    // Dados do Estágio
    data_inicio: Date;
    data_termino: Date;
    carga_horaria_semanal: number;
    bolsa_auxilio: number;
    seguro_apolice: string;
    nome_seguradora: string;
    data_assinatura: Date;
    
    // Horários do estágio
    horarios_estagio: Array<{
        dia: string;
        inicio: Date;
        fim: Date;
    }>;
    
    // Responsável pelo menor (se aplicável)
    possui_responsavel_menor: boolean;
    responsavel_menor_nome?: string;
    responsavel_menor_cpf?: string;
}

// Função para formatar horários para texto
function formatarHorariosParaTexto(
    horarios: Array<{ dia: string; inicio: Date; fim: Date }>,
    incluirHorasNoFinal: boolean = true
): string {
    if (!horarios || horarios.length === 0) {
        return "Horários não definidos.";
    }

    // Agrupa os horários por dia da semana
    const horariosPorDia: { [key: string]: string[] } = {};
    
    horarios.forEach(horario => {
        const dia = horario.dia;
        const inicio = horario.inicio.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const fim = horario.fim.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        if (!horariosPorDia[dia]) {
            horariosPorDia[dia] = [];
        }
        horariosPorDia[dia].push(`das ${inicio} às ${fim}`);
    });

    // Ordena os dias da semana
    const ordemDias = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
    const partesHorario: string[] = [];

    // Processa blocos de dias consecutivos com os mesmos horários
    let currentBlockDays: string[] = [];
    let currentBlockTimes: string[] = [];

    for (const dia of ordemDias) {
        if (horariosPorDia[dia]) {
            const timesForDay = horariosPorDia[dia].sort();
            
            if (currentBlockDays.length === 0) {
                // Inicia um novo bloco
                currentBlockDays.push(dia);
                currentBlockTimes = timesForDay;
            } else if (JSON.stringify(timesForDay) === JSON.stringify(currentBlockTimes)) {
                // Continua o bloco
                currentBlockDays.push(dia);
            } else {
                // O bloco anterior terminou, inicia um novo
                partesHorario.push(formatarBloco(currentBlockDays, currentBlockTimes, ordemDias));
                currentBlockDays = [dia];
                currentBlockTimes = timesForDay;
            }
        } else {
            // Dia sem horário, encerra o bloco atual se houver
            if (currentBlockDays.length > 0) {
                partesHorario.push(formatarBloco(currentBlockDays, currentBlockTimes, ordemDias));
                currentBlockDays = [];
                currentBlockTimes = [];
            }
        }
    }

    // Adiciona o último bloco se ele existir
    if (currentBlockDays.length > 0) {
        partesHorario.push(formatarBloco(currentBlockDays, currentBlockTimes, ordemDias));
    }

    // Combina as partes formatadas
    let resultado: string;
    if (partesHorario.length > 1) {
        resultado = partesHorario.slice(0, -1).join(", ") + " e " + partesHorario[partesHorario.length - 1];
    } else if (partesHorario.length === 1) {
        resultado = partesHorario[0];
    } else {
        resultado = "Horários não definidos.";
    }

    if (incluirHorasNoFinal && resultado !== "Horários não definidos.") {
        if (!resultado.toLowerCase().trim().endsWith('horas')) {
            resultado += ' horas';
        }
    }

    return resultado;
}

function formatarBloco(days: string[], times: string[], ordemDias: string[]): string {
    const timesFormatted = times.join(" e ");
    
    if (days.length === 1) {
        return `${timesFormatted}, de ${days[0].toLowerCase()}`;
    } else if (days.length === 2) {
        return `${timesFormatted}, de ${days[0].toLowerCase()} e ${days[1].toLowerCase()}`;
    } else {
        const firstDayIdx = ordemDias.indexOf(days[0]);
        const lastDayIdx = ordemDias.indexOf(days[days.length - 1]);
        let daysRangeStr = ordemDias[firstDayIdx].toLowerCase();
        
        if (firstDayIdx !== lastDayIdx) {
            daysRangeStr += ` a ${ordemDias[lastDayIdx].toLowerCase()}`;
        }
        
        return `${timesFormatted}, de ${daysRangeStr}`;
    }
}

// Função para formatar data em português
function formatarDataPortugues(data: Date): string {
    const meses = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    
    const dia = data.getDate();
    const mes = meses[data.getMonth()];
    const ano = data.getFullYear();
    
    return `${dia} de ${mes} de ${ano}`;
}

// Função para converter número para extenso
function numeroParaExtenso(numero: number): string {
    const unidades = [
        '', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
        'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'
    ];
    
    const dezenas = [
        '', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'
    ];
    
    if (numero === 0) return 'zero';
    if (numero < 20) return unidades[numero];
    if (numero < 100) {
        const dezena = Math.floor(numero / 10);
        const unidade = numero % 10;
        return dezenas[dezena] + (unidade > 0 ? ' e ' + unidades[unidade] : '');
    }
    
    return numero.toString(); // Para números maiores, retorna o número
}

// Função para converter valor monetário para extenso
function valorParaExtenso(valor: number): string {
    const reais = Math.floor(valor);
    const centavos = Math.round((valor - reais) * 100);
    
    let resultado = '';
    
    if (reais > 0) {
        resultado += numeroParaExtenso(reais);
        resultado += reais === 1 ? ' real' : ' reais';
    }
    
    if (centavos > 0) {
        if (reais > 0) resultado += ' e ';
        resultado += numeroParaExtenso(centavos);
        resultado += centavos === 1 ? ' centavo' : ' centavos';
    }
    
    return resultado || 'zero reais';
}

// Função para buscar dados completos do estágio
export async function buscarDadosEstagioCompleto(estagioId: number): Promise<DadosEstagioCompleto | null> {
    try {
        const estagio = await prisma.estagio.findUnique({
            where: { id: estagioId },
            include: {
                aluno: {
                    include: {
                        curso: true,
                        cidade: true
                    }
                },
                empresa: {
                    include: {
                        cidade: true
                    }
                },
                instituicao: {
                    include: {
                        cidade: true
                    }
                },
                seguradora: true,
                horarios: true
            }
        });

        if (!estagio) {
            return null;
        }

        // Formatar horários
        const horariosFormatados = estagio.horarios.map(horario => ({
            dia: horario.diaSemana,
            inicio: horario.horarioInicio,
            fim: horario.horarioFim
        }));

        return {
            // Dados da Empresa
            empresa_nome: estagio.empresa.nome,
            empresa_endereco: estagio.empresa.endereco || '',
            empresa_cidade: estagio.empresa.cidade.nome,
            empresa_uf: estagio.empresa.cidade.uf,
            empresa_cnpj: estagio.empresa.cnpj || '',

            // Dados do Aluno
            aluno_nome: estagio.aluno.nome,
            aluno_rg: estagio.aluno.rg || '',
            aluno_cpf: estagio.aluno.cpf || '',
            aluno_endereco: estagio.aluno.endereco || '',
            aluno_cidade: estagio.aluno.cidade.nome,
            aluno_uf: estagio.aluno.cidade.uf,
            aluno_serie: estagio.aluno.serie || '',

            // Dados do Curso
            curso_habilitacao: estagio.aluno.curso.habilitacao || estagio.aluno.curso.nome,

            // Dados da Instituição
            instituicao_nome: estagio.instituicao.nome,
            instituicao_cidade: estagio.instituicao.cidade.nome,

            // Dados do Estágio
            data_inicio: estagio.dataInicio,
            data_termino: estagio.dataTermino,
            carga_horaria_semanal: estagio.cargaHorariaSemanal || 0,
            bolsa_auxilio: Number(estagio.bolsaAuxilio) || 0,
            seguro_apolice: estagio.seguroApolice || '',
            nome_seguradora: estagio.seguradora?.nome || '',
            data_assinatura: new Date(),

            // Horários
            horarios_estagio: horariosFormatados,

            // Responsável pelo menor (assumindo que não há campo idade, usando data de nascimento se existir)
            possui_responsavel_menor: false, // Simplificado por enquanto
            responsavel_menor_nome: undefined,
            responsavel_menor_cpf: undefined
        };
    } catch (error) {
        console.error('Erro ao buscar dados do estágio:', error);
        return null;
    }
}

// Função para gerar termo usando template Word existente
export async function gerarTermoComTemplate(
    estagioId: number,
    outputPath: string = 'termo_estagio_template_preenchido.docx'
): Promise<boolean> {
    try {
        const dados = await buscarDadosEstagioCompleto(estagioId);
        if (!dados) {
            console.error('Dados do estágio não encontrados');
            return false;
        }

        // Caminho para o template
        const templatePath = path.join(__dirname, 'termo_estagio_template.docx');
        
        // Verificar se o template existe
        if (!fs.existsSync(templatePath)) {
            console.error('Template não encontrado:', templatePath);
            return false;
        }

        // Ler o template
        const templateBuffer = fs.readFileSync(templatePath);
        const zip = new PizZip(templateBuffer);
        
        // Configurar delimiters personalizados para evitar conflitos
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: {
                start: '{{',
                end: '}}'
            }
        });

        // Mapeamento dos placeholders para os dados
        const placeholders = {
            // Dados da Concedente (Empresa)
            CONCEDENTE_NOME: dados.empresa_nome.toUpperCase(),
            CONCEDENTE_ENDERECO: dados.empresa_endereco.toUpperCase(),
            CONCEDENTE_CIDADE_UF: `${dados.empresa_cidade.toUpperCase()}-${dados.empresa_uf.toUpperCase()}`,
            CONCEDENTE_CNPJ: dados.empresa_cnpj,

            // Dados do Aluno (Estagiário)
            ALUNO_NOME: dados.aluno_nome.toUpperCase(),
            ALUNO_RG: dados.aluno_rg,
            ALUNO_ENDERECO: dados.aluno_endereco.toUpperCase(),
            ALUNO_CIDADE_UF: `${dados.aluno_cidade.toUpperCase()}-${dados.aluno_uf.toUpperCase()}`,
            ALUNO_CPF: dados.aluno_cpf,
            ALUNO_SERIE: dados.aluno_serie,

            // Dados do Curso
            CURSO_HABILITACAO: dados.curso_habilitacao.toUpperCase(),

            // Dados da Instituição
            INSTITUICAO_NOME: dados.instituicao_nome.toUpperCase(),

            // Dados do Estágio
            ESTAGIO_DATA_INICIO: dados.data_inicio.toLocaleDateString('pt-BR'),
            ESTAGIO_DATA_TERMINO: dados.data_termino.toLocaleDateString('pt-BR'),
            ESTAGIO_CARGA_HORARIA_SEMANAL: dados.carga_horaria_semanal.toString(),
            ESTAGIO_CARGA_HORARIA_EXTENSO: numeroParaExtenso(dados.carga_horaria_semanal),
            ESTAGIO_HORARIOS_DETALHADOS: formatarHorariosParaTexto(dados.horarios_estagio, false),
            ESTAGIO_BOLSA_AUXILIO_VALOR: `R$ ${dados.bolsa_auxilio.toFixed(2).replace('.', ',')}`,
            ESTAGIO_BOLSA_AUXILIO_EXTENSO: valorParaExtenso(dados.bolsa_auxilio),
            ESTAGIO_SEGURO_APOLICE: dados.seguro_apolice,
            ESTAGIO_NOME_SEGURADORA: dados.nome_seguradora.toUpperCase(),
            ESTAGIO_DATA_ASSINATURA: formatarDataPortugues(dados.data_assinatura),
        };

        // Substituir os placeholders
        doc.setData(placeholders);

        try {
            // Renderizar o documento
            doc.render();
        } catch (error) {
            console.error('Erro ao renderizar template:', error);
            console.error('Detalhes do erro:', error);
            
            // Se houver erro com o template, usar a geração programática como fallback
            console.log('Usando geração programática como fallback...');
            return await gerarTermoWord(estagioId, outputPath);
        }

        // Gerar o buffer do documento
        const buffer = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9,
            },
        });

        // Salvar o arquivo
        await fs.promises.writeFile(outputPath, buffer);
        
        console.log(`Termo gerado com template: ${outputPath}`);
        return true;
    } catch (error) {
        console.error('Erro ao gerar termo com template:', error);
        
        // Se houver erro, usar a geração programática como fallback
        console.log('Usando geração programática como fallback...');
        return await gerarTermoWord(estagioId, outputPath);
    }
}

// Função para gerar termo em Word (.docx) - usado como fallback
async function gerarTermoWord(
    estagioId: number,
    outputPath: string = 'termo_estagio.docx'
): Promise<boolean> {
    try {
        const dados = await buscarDadosEstagioCompleto(estagioId);
        if (!dados) {
            console.error('Dados do estágio não encontrados');
            return false;
        }

        // Criar documento Word
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "TERMO DE COMPROMISSO DE ESTÁGIO",
                                bold: true,
                                size: 32
                            })
                        ],
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 }
                    }),
                    
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Pelo presente instrumento as partes nomeadas, de um lado ${dados.empresa_nome.toUpperCase()}, com sede a ${dados.empresa_endereco.toUpperCase()}, ${dados.empresa_cidade.toUpperCase()}-${dados.empresa_uf.toUpperCase()} inscrito no CNPJ sob o n.º ${dados.empresa_cnpj}, neste ato representado pelo ao final assinado, doravante denominada CONCEDENTE, e de outro lado, o(a) estudante ${dados.aluno_nome.toUpperCase()}, RG nº. ${dados.aluno_rg}, residente e domiciliado(a) na ${dados.aluno_endereco.toUpperCase()}, ${dados.aluno_cidade.toUpperCase()}-${dados.aluno_uf.toUpperCase()}, aluno(a) regularmente matriculado(a) na ${dados.aluno_serie} do Ensino Médio com ${dados.curso_habilitacao.toUpperCase()}, na ${dados.instituicao_nome.toUpperCase()}, Estado de São Paulo, doravante denominada INSTITUIÇÃO DE ENSINO, acordam e estabelecem entre si as cláusulas e condições que regerão este TERMO DE COMPROMISSO DE ESTÁGIO.`
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA PRIMEIRA: este Termo de Compromisso de estágio está fundamentado na Lei Federal Nº 11.788 de 25 de Dezembro de 2008.",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA SEGUNDA: Fica compromissado entre as partes que:",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `a. as atividades de estágio a serem cumpridas pelo (a) estagiário (a) serão desenvolvidas ${formatarHorariosParaTexto(dados.horarios_estagio, false)}, totalizando ${dados.carga_horaria_semanal} (${numeroParaExtenso(dados.carga_horaria_semanal)}) horas semanais.`
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "b. a jornada de atividade de estágio deverá compatibilizar-se com o horário escolar do (a) estagiário (a) e com o horário do (a) concedente."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "c. Fica estabelecido ao estagiário, sempre que o estágio tenha duração igual ou superior a 1 (um) ano, período de recesso de 30 (trinta) dias, a ser gozado preferencialmente durante suas férias escolares."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `d. este Termo de Compromisso de Estágio terá vigência de ${dados.data_inicio.toLocaleDateString('pt-BR')} a ${dados.data_termino.toLocaleDateString('pt-BR')} podendo ser denunciado a qualquer tempo, unilateralmente, mediante comunicado escrito com antecedência mínima de 5(cinco) dias.`
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA TERCEIRA: No desenvolvimento do estágio ora compromissado, caberá ao (à) concedente",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "a. garantir ao estagiário o cumprimento das exigências escolares, inclusive no que se refere ao horário escolar."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "b. proporcionar ao (a) estagiário (a) atividade de aprendizagem social, profissional e cultural compatíveis com sua formação profissional;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "c. proporcionar ao (a) estagiário (a) condições de treinamento prático e de relacionamento humano;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "d. proporcionar à instituição de ensino, sempre que necessário, subsídios que possibilitem o acompanhamento, a supervisão e a avaliação do estágio;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "e. coadjuvar o CEETEPS, na avaliação final do estudante-estagiário, referente às atividades executadas no decorrer do estágio."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA QUARTA: no desenvolvimento do estágio ora compromissado, caberá ao estagiário(a):",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "a. cumprir com todo o empenho e interesse a programação estabelecida para seu estágio;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "b. observar as diretrizes e/ou normas internas do (a) concedente e os dispositivos legais aplicáveis ao estágio;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "c. comunicar à instituição de ensino qualquer fato relevante sobre seu estágio;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "d. elaborar e entregar ao concedente, para posterior análise da instituição de ensino, relatório sobre o estágio, na forma estabelecida por esta última."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `CLÁUSULA QUINTA: durante a vigência do estágio serão concedidos mensalmente ao (a) estagiário bolsa auxílio no valor de R$ ${dados.bolsa_auxilio.toFixed(2).replace('.', ',')} (${valorParaExtenso(dados.bolsa_auxilio)})`,
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `CLÁUSULA SEXTA: na vigência regular do presente Termo de Compromisso, o (a) estagiário (a) estará incluído (a) na cobertura de seguro contra acidentes pessoais proporcionada pela apólice nº. ${dados.seguro_apolice} da ${dados.nome_seguradora.toUpperCase()}`,
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA SÉTIMA: constituem-se motivo para interrupção automática da",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "a) a conclusão ou abandono do curso e o trancamento da matrícula;"
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "b) o não cumprimento do convencionado neste Termo de Compromisso."
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA OITAVA: o presente estágio não acarretará vínculo empregatício de qualquer natureza entre o (a) estagiário (a) e o (a) concedente, nos termos do que dispões o § 1 Art. 12 da Lei Nº 11.788/2008.",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "CLÁUSULA NONA: De comum acordo, as partes elegem uma das Varas do Foro da Capital do Estado de São Paulo, renunciando, desde logo, a qualquer outro, por mais privilegiado que seja, para que sejam dirimidas quaisquer questões oriundas do presente instrumento.",
                                bold: true
                            })
                        ],
                        spacing: { after: 200 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "E, por estarem de inteiro e comum acordo com os termos ora ajustados, as partes assinam o presente instrumento em 3 (três) vias de igual teor e forma, para um só efeito, na presença das testemunhas também ao final assinadas."
                            })
                        ],
                        spacing: { after: 400 }
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Santa Fé do Sul, ${formatarDataPortugues(dados.data_assinatura)}`
                            })
                        ],
                        spacing: { after: 400 }
                    }),

                    // Tabela de assinaturas
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Pelo concedente:",
                                                        bold: true
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "EMPRESA"
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "(Carimbo e assinatura)"
                                                    })
                                                ]
                                            })
                                        ],
                                        width: { size: 50, type: WidthType.PERCENTAGE }
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Estagiário(a):",
                                                        bold: true
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: dados.aluno_nome.toUpperCase()
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: `CPF: ${dados.aluno_cpf}`
                                                    })
                                                ]
                                            })
                                        ],
                                        width: { size: 50, type: WidthType.PERCENTAGE }
                                    })
                                ]
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Pela instituição de ensino:",
                                                        bold: true
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Fernando Pedroso"
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "R.G. 41.542.489-6"
                                                    })
                                                ]
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Diretor de Etec"
                                                    })
                                                ]
                                            })
                                        ],
                                        width: { size: 50, type: WidthType.PERCENTAGE }
                                    }),
                                    new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Responsável legal pelo estagiário menor de 18 anos:",
                                                        bold: true
                                                    })
                                                ]
                                            })
                                        ],
                                        width: { size: 50, type: WidthType.PERCENTAGE }
                                    })
                                ]
                            })
                        ],
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    })
                ]
            }]
        });

        // Salvar o documento
        const buffer = await Packer.toBuffer(doc);
        await fs.promises.writeFile(outputPath, buffer);
        
        console.log(`Termo Word gerado: ${outputPath}`);
        return true;
    } catch (error) {
        console.error('Erro ao gerar termo Word:', error);
        return false;
    }
}