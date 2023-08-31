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

    /// <summary>
    /// Devuelve las marcas de la base de datos
    /// </summary>
    /// <returns>Devuelve lista de marcas</returns>
    
    [HttpGet]
    public async Task<List<MarcaDto>> GetMarcas()
    {
        var marcas = await _context.Marcas.ToListAsync();
        return _mapper.Map<List<MarcaDto>>(marcas);
    }

    /// <summary>
    /// Devuelve una marca por ID
    /// </summary>
    /// <param name="id">ID de la marca a retornar</param>
    /// <returns>Marca con el ID ingresado</returns>
    
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
    
    /// <summary>
    /// Registra una nueva marca en la base de datos
    /// </summary>
    /// <param name="createMarcaDto">Nombre de la marca a registrar</param>
    /// <returns>Confirmacion de registro</returns>
    
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