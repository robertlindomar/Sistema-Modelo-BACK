import nodemailer from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
} = process.env as Record<string, string>;

export function createTransport() {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: String(SMTP_SECURE || "false").toLowerCase() === "true",
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });
  return transporter;
}

export async function sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
  const transporter = createTransport();
  await transporter.sendMail({
    from: SMTP_FROM || 'no-reply@sistemamodelo.local',
    to,
    subject: 'Recuperação de senha - Sistema Modelo',
    html: `
      <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha - Sistema Modelo</title>
</head>

<body
    style="margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; min-height: 100vh;">
    <!-- Container Principal -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        <tr>
            <td align="center" style="padding: 40px 20px;">

                <!-- Card Principal -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600"
                    style="background: #ffffff; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); overflow: hidden; max-width: 600px;">

                    <!-- Header com Gradiente -->
                    <tr>
                        <td
                            style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 40px 30px; text-align: center;">

                            <h1
                                style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                Redefinição de Senha
                            </h1>
                            <p
                                style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0; font-weight: 300;">
                                Sistema Modelo
                            </p>
                        </td>
                    </tr>

                    <!-- Conteúdo Principal -->
                    <tr>
                        <td style="padding: 40px;">

                            <!-- Saudação -->
                            <div style="margin-bottom: 30px;">
                                <h2
                                    style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 16px; line-height: 1.3;">
                                    Olá! 👋
                                </h2>
                                <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                                    Recebemos uma solicitação para redefinir a senha da sua conta no <strong
                                        style="color: #2563eb;">Sistema Modelo</strong>.
                                </p>
                            </div>

                            <!-- Card de Informação -->
                            <div
                                style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-radius: 12px; padding: 24px; margin: 30px 0; border-left: 4px solid #2563eb;">
                                <div style="display: flex; align-items: center; margin-bottom: 16px;">
                                    <div
                                        style="width: 40px; height: 40px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                                        <img src="https://img.icons8.com/ios-filled/20/2563eb/link.png"
                                            alt="Ícone de link" style="width: 20px; height: 20px;" />
                                    </div>
                                    <div>
                                        <h3
                                            style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 0; line-height: 1.3;">
                                            Link de Redefinição
                                        </h3>
                                        <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0; line-height: 1.4;">
                                            Válido por <strong style="color: #dc2626;">1 hora</strong>
                                        </p>
                                    </div>
                                </div>
                                <p style="color: #374151; font-size: 15px; line-height: 1.5; margin: 0;">
                                    Para criar uma nova senha, clique no botão abaixo:
                                </p>
                            </div>

                            <!-- Botão Principal -->
                            <div style="text-align: center; margin: 32px 0;">
                                <a href="${resetLink}" target="_blank" rel="noreferrer noopener"
                                    style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3); transition: all 0.3s ease; border: none;">
                                    🔐 Redefinir Minha Senha
                                </a>
                            </div>

                            <!-- Aviso de Segurança -->
                            <div
                                style="background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 24px 0;">
                                <div style="display: flex; align-items: flex-start;">
                                    <div
                                        style="width: 20px; height: 20px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0; margin-top: 2px;">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                            style="color: white;">
                                            <path
                                                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                                stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p
                                            style="color: #92400e; font-size: 14px; line-height: 1.5; margin: 0; font-weight: 500;">
                                            <strong>Importante:</strong> Se você não solicitou a redefinição de senha,
                                            pode ignorar este e-mail com segurança. Sua senha atual permanecerá
                                            inalterada.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Link Alternativo -->
                            <div
                                style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e5e7eb;">
                                <p style="color: #6b7280; font-size: 13px; margin: 0 0 12px; font-weight: 500;">
                                    💡 <strong>Problemas com o botão?</strong>
                                </p>
                                <p style="color: #6b7280; font-size: 13px; margin: 0 0 8px; line-height: 1.4;">
                                    Copie e cole o link abaixo no seu navegador:
                                </p>
                                <div
                                    style="background: #ffffff; border: 1px solid #d1d5db; border-radius: 6px; padding: 12px; word-break: break-all;">
                                    <a href="${resetLink}" target="_blank" rel="noreferrer noopener"
                                        style="color: #2563eb; text-decoration: none; font-size: 12px; font-family: 'Courier New', monospace;">
                                        ${resetLink}
                                    </a>
                                </div>
                            </div>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td
                            style="background: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">

                            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px; line-height: 1.4;">
                                <strong>Sistema Modelo</strong> - Sua plataforma confiável
                            </p>
                            <p style="color: #9ca3af; font-size: 11px; margin: 0; line-height: 1.4;">
                                Esta é uma mensagem automática. Por favor, não responda este e-mail.<br>
                                Para suporte, entre em contato através do nosso site oficial.
                            </p>
                        </td>
                    </tr>

                </table>

                <!-- Assinatura -->
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: rgba(255,255,255,0.8); font-size: 11px; margin: 0; line-height: 1.4;">
                        © 2024 Sistema Modelo. Todos os direitos reservados.
                    </p>
                </div>

            </td>
        </tr>
    </table>

</body>

</html>

    `,
  });
}


