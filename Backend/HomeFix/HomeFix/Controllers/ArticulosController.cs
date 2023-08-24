using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;


public class ArticulosController : BaseController
{
    private readonly HomeFixDbContext _context;

    public ArticulosController(HomeFixDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<List<Articulo>> GetArticulos()
    {
        return await _context.Articulo.ToListAsync();
    }

    [HttpGet("id", Name = "GetArticulo")]
    public async Task<ActionResult<Articulo>> GetArticulo(int id)
    {
        var articulo = await _context.Articulo.FindAsync(id);
        if (articulo == null)
        {
            return NotFound();
        }

        return articulo;
    }
    
    [HttpPost]
    public async Task<ActionResult<Articulo>> CreateArticulo(CreateArticuloDto createArticuloDto){
        var articulo = new Articulo()
        {
            Nombre = createArticuloDto.Nombre,
            Alto = createArticuloDto.Alto,
            Ancho = createArticuloDto.Ancho,
            MarcaId = createArticuloDto.MarcaId,
            Cantidad = createArticuloDto.Cantidad,
            Costo = createArticuloDto.Costo,
            Precio = Decimal.Multiply(createArticuloDto.Costo, 1.2m),
            Descripcion = createArticuloDto.Descripcion,
            CantidadMinima = createArticuloDto.CantidadMinima,
            Peso = createArticuloDto.Peso
        };

        _context.Articulo.Add(articulo);
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetArticulo", new {Id = articulo.Id}, articulo);
        return BadRequest(new ProblemDetails { Title = "Problema creando el articulo"});
    }
}