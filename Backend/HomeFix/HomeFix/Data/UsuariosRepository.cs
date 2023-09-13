using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Data;

public class UsuariosRepository: IUsuariosRepository
{
    private readonly HomeFixDbContext _context;

    public UsuariosRepository(HomeFixDbContext context)
    {
        _context = context;
    }
    public async Task<List<Usuario>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }
}