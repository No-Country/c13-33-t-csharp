using HomeFix.Dbcontext;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Data;


public class UnitOfWork : IUnitOfWork
{
    private readonly HomeFixDbContext _context;
    private readonly UserManager<Usuario> _userManager;

    public UnitOfWork(HomeFixDbContext context, UserManager<Usuario> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    public IMarcasRepository MarcasRepository => new MarcasRepository(_context);
    public ICategoriasRepository CategoriasRepository => new CategoriasRepository(_context);
    public ICuentaRepository CuentaRepository => new CuentaRepository(_userManager);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

   
    
    
}