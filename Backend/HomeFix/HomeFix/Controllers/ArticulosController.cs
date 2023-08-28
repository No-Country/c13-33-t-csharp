using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class ArticulosController : BaseController
{
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;
    private readonly IFileStorageService _fileStorageService;

    public ArticulosController(HomeFixDbContext context, IMapper mapper,IFileStorageService fileStorageService)
    {
        _context = context;
        _mapper = mapper;
        _fileStorageService = fileStorageService;
    }

    [HttpGet]
    public async Task<List<ArticuloDto>> GetArticulos()
    {
        var articulos = await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria)
            .ThenInclude(x=> x.CategoriaPadre)
            .ToListAsync();
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
    public async Task<ActionResult<Articulo>> CreateArticulo([FromForm]CreateArticuloDto createArticuloDto)
    {
        var articulo = _mapper.Map<Articulo>(createArticuloDto);

        if (createArticuloDto.Imagen != null)
        {
            var extension = Path.GetExtension(createArticuloDto.Imagen.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var imagenResult = await _fileStorageService.UploadFile(createArticuloDto.Imagen, 1, fileName);
            articulo.Imagen = imagenResult;
        }
        
        _context.Articulo.Add(articulo);
        
        var result = await _context.SaveChangesAsync() > 0;
        // var articuloDto = _mapper.Map<ArticuloDto>(articulo);
        var articuloDto = _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider).First(x => x.Id == articulo.Id);
        if (result) return CreatedAtRoute("GetArticulo", new {Id = articuloDto.Id}, articuloDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando el articulo"});
    }
}