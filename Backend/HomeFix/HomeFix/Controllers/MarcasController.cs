using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class MarcasController : BaseController
{
    private readonly HomeFixDbContext _context;


    public MarcasController(HomeFixDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<List<Marca>> GetMarcas()
    {
        return await _context.Marcas.ToListAsync();
    }

    [HttpGet("{id}", Name = "GetMarca")]
    public async Task<ActionResult<MarcaDto>> GetMarcaById(int id)
    {
        var marca = await _context.Marcas.FindAsync(id);
        if (marca == null)
        {
            return NotFound();
        }

        return new MarcaDto {
            Id = marca.Id,
            Nombre = marca.Nombre
        };
    }


    [HttpPost]
    public async Task<ActionResult<Marca>> CreateMarca(CreateMarcaDto createMarcaDto)
    {
        var marca = new Marca
        {
            Nombre = createMarcaDto.Nombre
        };

        _context.Marcas.Add(marca);
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtRoute("GetMarca", new {Id = marca.Id}, marca);
        return BadRequest(new ProblemDetails { Title = "Problema creando la marca"});
    }
}