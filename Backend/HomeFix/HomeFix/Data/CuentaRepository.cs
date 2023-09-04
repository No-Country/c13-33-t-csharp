using HomeFix.Dbcontext;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Data;

public class CuentaRepository : ICuentaRepository
{
    private readonly UserManager<Usuario> _userManager;
    private readonly HomeFixDbContext _context;

    public CuentaRepository(UserManager<Usuario> userManager, HomeFixDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<List<Usuario>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<Usuario> FindUserByEmail(string email)
    {
        return  await _userManager.FindByEmailAsync(email);
    }

    public async Task<Usuario> FindUserById(string id)
    {
        return  await _userManager.FindByIdAsync(id);
    }

    public async Task<IList<string>> getRoles(Usuario usuario)
    {
        return await _userManager.GetRolesAsync(usuario);
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