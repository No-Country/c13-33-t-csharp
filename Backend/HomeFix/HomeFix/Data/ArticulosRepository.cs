using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
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

    public async Task<List<ArticuloDto>> GetAllArticulos()
    {
        var articulos =  await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria)
            .ThenInclude(x => x.CategoriaPadre)
            .Include(x => x.UsuarioUltimaModificacion)
            .Where(x => x.Activo)
            .ToListAsync();
        
        var articulosDto = _mapper.Map<List<ArticuloDto>>(articulos);
        foreach (var articulo in articulosDto)
        {
            var totalVendidos = 0;
            var movimientosDetallesVendidos = await _context.MovimientosDetalle.Where(x => x.ArticuloId == articulo.Id)
                .Select( x=> x.Cantidad).ToListAsync();
        
            movimientosDetallesVendidos.ForEach(x => totalVendidos += x);

            articulo.Vendidos = totalVendidos;
        }

        return articulosDto;
    }

    public async Task<Articulo> FindArticuloById(int id)
    {
        return await _context.Articulo.FirstAsync(x => x.Id == id);
        
        
    }
    
    public async Task<ActionResult<ArticuloDto>> FindProjectedArticuloByIdAsync(int id)
    {
        var articulo = await _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .FirstAsync(x => x.Id == id);
        
        if (articulo == null)
        {
            return new NotFoundResult();
        }
        var totalVendidos = 0;
        var movimientosDetallesVendidos = await _context.MovimientosDetalle.Where(x => x.ArticuloId == id)
            .Select( x=> x.Cantidad).ToListAsync();
        
        movimientosDetallesVendidos.ForEach(x => totalVendidos += x);

        articulo.Vendidos = totalVendidos;

        return articulo;
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