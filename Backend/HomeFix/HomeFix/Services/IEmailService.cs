using HomeFix.Model;

namespace HomeFix.Services;

public interface IEmailService
{
    void SendEmail(Message message);
}