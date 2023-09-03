using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Data;

public class CuentaRepository : ICuentaRepository
{
    private readonly UserManager<Usuario> _userManager;

    public CuentaRepository(UserManager<Usuario> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Usuario> FindUserByEmail(string email)
    {
        return  await _userManager.FindByEmailAsync(email);
    }

    public async Task<Usuario> FindUserById(string id)
    {
        return  await _userManager.FindByIdAsync(id);
    }

    public async Task<bool> ComparePassword(Usuario usuario, string password)
    {
        return await _userManager.CheckPasswordAsync(usuario, password);
    }

    public async Task<string> GenerateResetToken(Usuario usuario)
    {
        return await _userManager.GeneratePasswordResetTokenAsync(usuario);
    }

    public async Task<IdentityResult> ResetPassword(Usuario user, string token, string newPassword)
    {
        return await _userManager.ResetPasswordAsync(user, token, newPassword);
    }
    
    
}