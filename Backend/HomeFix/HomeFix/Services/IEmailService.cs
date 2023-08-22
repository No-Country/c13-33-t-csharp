using HomeFix.DTOs;
using HomeFix.Model;

namespace HomeFix.Services;

public interface IEmailService
{
    void SendEmail(EmailDto request);
}