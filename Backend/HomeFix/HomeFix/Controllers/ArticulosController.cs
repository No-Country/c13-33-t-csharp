using System.Security.Claims;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class ArticulosController : BaseController
{
    private readonly UserManager<Usuario> _userManager;
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;
    private readonly IFileStorageService _fileStorageService;

    public ArticulosController(UserManager<Usuario> userManager, HomeFixDbContext context, IMapper mapper,
        IFileStorageService fileStorageService)
    {
        _userManager = userManager;
        _context = context;
        _mapper = mapper;
        _fileStorageService = fileStorageService;
    }


    [HttpGet]
    public async Task<List<ArticuloDto>> GetArticulos()
    {
        var articulos = await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria)
            .ThenInclude(x => x.CategoriaPadre)
            .Include(x => x.UsuarioUltimaModificacion)
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
    public async Task<ActionResult<Articulo>> CreateArticulo([FromForm] CreateArticuloDto createArticuloDto)
    {
        var articulo = _mapper.Map<Articulo>(createArticuloDto);
        var usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
        articulo.UsuarioUltimaModificacionId = usuario.Id;
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
        var articuloDto = _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .First(x => x.Id == articulo.Id);
        if (result) return CreatedAtRoute("GetArticulo", new {Id = articuloDto.Id}, articuloDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando el articulo"});
    }

    [HttpPatch("{id}")]
    public async Task<ActionResult<ArticuloDto>> UpdateArticulos([FromForm] UpdateArticuloDto updateDto, int id)
    {
        var articulo = await _context.Articulo.Include(x => x.UsuarioUltimaModificacion).FirstAsync(x => x.Id == id);
        var usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (articulo == null) return NotFound();

        MappingArticulo(updateDto, articulo);
        articulo.UsuarioUltimaModificacionId = usuario.Id;
        if (updateDto.Imagen != null)
        {
            var extension = Path.GetExtension(updateDto.Imagen.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var imagenResult = await _fileStorageService.UploadFile(updateDto.Imagen, 1, fileName);
            articulo.Imagen = imagenResult;
        }

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok(articulo);

        return BadRequest(new ProblemDetails {Title = "Problema actualizando el articulo"});
    }

    private static void MappingArticulo(UpdateArticuloDto updateDto, Articulo articulo)
    {
        articulo.CategoriaId = updateDto?.CategoriaId ?? articulo.CategoriaId;
        articulo.Nombre = updateDto?.Nombre ?? articulo.Nombre;
        articulo.Descripcion = updateDto?.Descripcion ?? articulo.Descripcion;
        articulo.Costo = updateDto?.Costo ?? articulo.Costo;
        if (updateDto.Costo != null)
        {
            articulo.Precio = updateDto.Costo * 1.2m ?? articulo.Precio;
        }

        articulo.Nombre = updateDto?.Nombre ?? articulo.Nombre;
        articulo.Cantidad = updateDto?.Cantidad ?? articulo.Cantidad;
        articulo.CantidadMinima = updateDto?.CantidadMinima ?? articulo.CantidadMinima;
        articulo.Alto = updateDto?.Alto ?? articulo.Alto;
        articulo.Ancho = updateDto?.Ancho ?? articulo.Ancho;
        articulo.Peso = updateDto?.Peso ?? articulo.Peso;
        articulo.MarcaId = updateDto?.MarcaId ?? articulo.MarcaId;
    }
}