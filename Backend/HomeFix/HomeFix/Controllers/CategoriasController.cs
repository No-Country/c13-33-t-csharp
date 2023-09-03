using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class CategoriasController : BaseController
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    public CategoriasController(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }
    
    /// <summary>
    /// Devuelve todas las categorias
    /// </summary>
    /// <returns>Lista de categorias</returns>

    [HttpGet]
    public async Task<List<CategoriaDto>> GetCategorias()
    {
        var categorias = await _uow.CategoriasRepository.GetAllCategorias();
        return _mapper.Map<List<CategoriaDto>>(categorias);
    }
    /// <summary>
    /// Devuelve una categoria por ID
    /// </summary>
    /// <param name="id">ID de la categoria a retornar</param>
    /// <returns>Categoria con el ID ingresado</returns>
    [HttpGet("{id}", Name = "GetCategoria")]
    public async Task<ActionResult<CategoriaDto>> GetCategoriaById(int id)
    {
        var categoria = await _uow.CategoriasRepository.FindCategoriaById(id);
        if (categoria == null)
        {
            return NotFound();
        }

        return _mapper.Map<CategoriaDto>(categoria);
    }

    /// <summary>
    /// Registra una nueva categoria en la base de datos
    /// </summary>
    /// <param name="createMarcaDto">Nombre de la categoria a registrar</param>
    /// <returns>Confirmacion de registro</returns>
    [HttpPost]
    public async Task<ActionResult<Categoria>> CreateCategoria(CreateCategoriaDto createCategoriaDto)
    {
        var categoria = _mapper.Map<Categoria>(createCategoriaDto);

        _uow.CategoriasRepository.AddCategoria(categoria);

        var categoriaDto = _mapper.Map<CategoriaDto>(categoria);

        if (await _uow.Complete()) return CreatedAtRoute("GetCategoria", new {Id = categoria.Id}, categoriaDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando la categoria"});
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteCategoriaByIdAsync(int id)
    {
        if (id == 0)
            return BadRequest();

        var categoria = await _uow.CategoriasRepository.FindCategoriaById(id);

        if (categoria is null)
            return NotFound();

        _uow.CategoriasRepository.RemoveCategoria(categoria);
        if (await _uow.Complete())
        {
            return Ok();
        }

        return BadRequest(new ProblemDetails {Title = "Problema eliminando la categoria"});
    }

}