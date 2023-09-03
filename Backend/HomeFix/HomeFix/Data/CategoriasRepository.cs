using HomeFix.Dbcontext;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Data;

public class CategoriasRepository : ICategoriasRepository
{
    private readonly HomeFixDbContext _context;

    public CategoriasRepository(HomeFixDbContext context)
    {
        _context = context;
    }

    public async Task<List<Categoria>> GetAllCategorias()
    {
        return await _context.Categorias.ToListAsync();
    }

    public async Task<Categoria> FindCategoriaById(int id)
    {
        return await _context.Categorias.Include(x => x.CategoriaPadre).FirstAsync(x => x.Id == id);
    }

    public void AddCategoria(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
    }

    public void RemoveCategoria(Categoria categoria)
    {
        _context.Categorias.Remove(categoria);
    }
}