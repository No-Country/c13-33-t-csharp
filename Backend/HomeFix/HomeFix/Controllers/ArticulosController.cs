using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class ArticulosController : BaseController
{
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;

    public ArticulosController(HomeFixDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<List<ArticuloDto>> GetArticulos()
    {
        var articulos = await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria).ThenInclude(a => a.Subcategoria).ToListAsync();
        return _mapper.Map<List<ArticuloDto>>(articulos);
    }

    [HttpGet("{id}", Name = "GetArticulo")]
    public async Task<ActionResult<ArticuloDto>> GetArticulo(int id)
    {
        var articulo = await _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .FirstAsync(x => x.Id == id);
        if (articulo == null)
        {
            return NotFound();
        }

        return articulo;
    }

    [HttpPost]
    public async Task<ActionResult<Articulo>> CreateArticulo(CreateArticuloDto createArticuloDto)
    {
        var articulo = _mapper.Map<Articulo>(createArticuloDto);
        // var articulo = new Articulo()
        // {
        //     Nombre = createArticuloDto.Nombre,
        //     Alto = createArticuloDto.Alto,
        //     Ancho = createArticuloDto.Ancho,
        //     MarcaId = createArticuloDto.MarcaId,
        //     Cantidad = createArticuloDto.Cantidad,
        //     Costo = createArticuloDto.Costo,
        //     Precio = Decimal.Multiply(createArticuloDto.Costo, 1.2m),
        //     Descripcion = createArticuloDto.Descripcion,
        //     CantidadMinima = createArticuloDto.CantidadMinima,
        //     Peso = createArticuloDto.Peso
        // };

        _context.Articulo.Add(articulo);
        var result = await _context.SaveChangesAsync() > 0;
        // var articuloDto = _mapper.Map<ArticuloDto>(articulo);
        var articuloDto = _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider).First();
        if (result) return CreatedAtRoute("GetArticulo", new {Id = articuloDto.Id}, articuloDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando el articulo"});
    }
}