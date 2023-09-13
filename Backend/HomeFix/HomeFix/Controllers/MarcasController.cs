using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class MarcasController : BaseController
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;


    public MarcasController(IMapper mapper, IUnitOfWork uow)
    {
        _mapper = mapper;
        _uow = uow;
    }

    /// <summary>
    /// Devuelve las marcas de la base de datos
    /// </summary>
    /// <returns>Devuelve lista de marcas</returns>
    [HttpGet]
    public async Task<List<MarcaDto>> GetMarcas()
    {
        var marcas = await _uow.MarcasRepository.GetAllMarcas();
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
        var marca = await _uow.MarcasRepository.FindMarcaById(id);
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

        _uow.MarcasRepository.AddMarca(marca);

        var marcaDto = _mapper.Map<MarcaDto>(marca);

        if (await _uow.Complete()) return CreatedAtRoute("GetMarca", new {Id = marcaDto.Id}, marcaDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando la marca"});
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteMarcaByIdAsync(int id)
    {
        if (id == 0)
            return BadRequest();

        var marca = await _uow.MarcasRepository.FindMarcaById(id);

        if (marca is null)
            return NotFound();

        _uow.MarcasRepository.RemoveMarca(marca);
        if (await _uow.Complete())
        {
            return Ok();
        }

        return BadRequest(new ProblemDetails {Title = "Problema eliminando la marca"});
    }
}