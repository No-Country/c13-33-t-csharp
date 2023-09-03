using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Data;

public class ArticulosRepository: IArticulosRepository
{
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;

    public ArticulosRepository(HomeFixDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<List<Articulo>> GetAllArticulos()
    {
        return await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria)
            .ThenInclude(x => x.CategoriaPadre)
            .Include(x => x.UsuarioUltimaModificacion)
            .Where(x => x.Activo)
            .ToListAsync();
    }

    public async Task<Articulo> FindArticuloById(int id)
    {
        return await _context.Articulo.FirstAsync(x => x.Id == id);
    }
    
    public async Task<ArticuloDto> FindProjectedArticuloByIdAsync(int id)
    {
        return await _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .FirstAsync(x => x.Id == id);
    }
    
    public ArticuloDto FindProjectedArticuloById(int id)
    {
        return _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .First(x => x.Id == id);
    }

    public async Task<Articulo> FindArticuloWithLastUserById(int id)
    {
        return await _context.Articulo.Include(x => x.UsuarioUltimaModificacion).FirstAsync(x => x.Id == id);
    }

    public void AddArticulo(Articulo articulo)
    {
        _context.Articulo.Add(articulo);
    }
}