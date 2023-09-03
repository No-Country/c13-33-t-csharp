using HomeFix.Dbcontext;
using HomeFix.Interfaces;

namespace HomeFix.Data;


public class UnitOfWork : IUnitOfWork
{
    private readonly HomeFixDbContext _context;

    public UnitOfWork(HomeFixDbContext context)
    {
        _context = context;
    }

    public IMarcasRepository MarcasRepository => new MarcasRepository(_context);
    public ICategoriasRepository CategoriasRepository => new CategoriasRepository(_context);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

   
    
    
}