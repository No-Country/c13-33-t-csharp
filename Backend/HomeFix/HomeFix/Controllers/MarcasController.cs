using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class MarcasController : BaseController
{
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;


    public MarcasController(HomeFixDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<List<MarcaDto>> GetMarcas()
    {
        var marcas = await _context.Marcas.ToListAsync();
        return _mapper.Map<List<MarcaDto>>(marcas);
    }

    [HttpGet("{id}", Name = "GetMarca")]
    public async Task<ActionResult<MarcaDto>> GetMarcaById(int id)
    {
        var marca = await _context.Marcas.FindAsync(id);
        if (marca == null)
        {
            return NotFound();
        }

        return _mapper.Map<MarcaDto>(marca);
    }


    [HttpPost]
    public async Task<ActionResult<Marca>> CreateMarca(CreateMarcaDto createMarcaDto)
    {
        var marca = _mapper.Map<Marca>(createMarcaDto);

        _context.Marcas.Add(marca);
        var result = await _context.SaveChangesAsync() > 0;
        
        var marcaDto = _mapper.Map<MarcaDto>(marca);
        
        if (result) return CreatedAtRoute("GetMarca", new {Id = marcaDto.Id}, marcaDto);
        return BadRequest(new ProblemDetails { Title = "Problema creando la marca"});
    }
}