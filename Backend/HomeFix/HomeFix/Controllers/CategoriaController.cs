using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;

public class CategoriaController : BaseController
{
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;

    public CategoriaController(HomeFixDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    /// <summary>
    /// Devuelve todas las categorias
    /// </summary>
    /// <returns>Lista de categorias</returns>
    
    [HttpGet]
    public async Task<List<CategoriaDto>> GetCategorias()
    {
        var categorias = await _context.Categorias.FindAsync();
        return _mapper.Map<List<CategoriaDto>>(categorias);
    }


}