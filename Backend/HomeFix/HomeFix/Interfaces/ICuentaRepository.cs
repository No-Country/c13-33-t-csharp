using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Interfaces;

public interface ICuentaRepository
{
    
    Task<Usuario> FindUserByEmail(string email);
    
    Task<Usuario> FindUserById(string id);
    
    Task<IList<string>> getRoles(Usuario usuario); 

    Task<bool> ComparePassword(Usuario usuario, string password);

    Task<string> GenerateResetToken(Usuario usuario);

    Task<IdentityResult> ResetPassword(Usuario user, string token, string newPassword);
}