using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfiguration;

        public EmailSender(EmailConfiguration emailConfiguration)
        {
            _emailConfiguration = emailConfiguration;
        }

        public async Task SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);

            await SendEmailAsync(emailMessage);
        }
        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfiguration.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = string.Format("<div>{0}</div>", message.Content) };
            if(message.Attachments != null && message.Attachments.Any())
            {
                byte[] fileBytes;
                foreach (var attachment in message.Attachments)
                {
                    using(var ms = new MemoryStream())
                    {
                        attachment.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }
                    bodyBuilder.Attachments.Add(attachment.FileName, fileBytes, ContentType.Parse(attachment.ContentType));
                }
            }
            emailMessage.Body = bodyBuilder.ToMessageBody();

            return emailMessage;
        }
        private async Task SendEmailAsync(MimeMessage mailMessage)
        {
            using(var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await  client.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }

        }
    }
}
