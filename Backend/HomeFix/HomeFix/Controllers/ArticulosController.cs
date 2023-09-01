using System.Security.Claims;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

[Authorize]
public class ArticulosController : BaseController
{
    private readonly UserManager<Usuario> _userManager;
    private readonly HomeFixDbContext _context;
    private readonly IMapper _mapper;
    private readonly ImageService _imageService;

    public ArticulosController(UserManager<Usuario> userManager, HomeFixDbContext context, IMapper mapper,
        ImageService imageService)
    {
        _userManager = userManager;
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    /// <summary>
    /// Lista articulos de la API. Utiliza un token para poder verificar su uso
    /// </summary>
    /// <returns>Lista de Articulos</returns>
       
    [HttpGet]
    public async Task<List<ArticuloDto>> GetArticulos()
    {
        var articulos = await _context.Articulo.Include(x => x.Marca)
            .Include(x => x.Categoria)
            .ThenInclude(x => x.CategoriaPadre)
            .Include(x => x.UsuarioUltimaModificacion)
            .Where(x => x.Activo)
            .ToListAsync();
        return _mapper.Map<List<ArticuloDto>>(articulos);
    }

    /// <summary>
    /// Devuelve un articulo especifico de la API. Utiliza un token para verificar su uso
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
 
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

    /// <summary>
    /// Registra un articulo dentro de la base de datos. Utiliza token para verificar uso
    /// </summary>
    /// <param name="createArticuloDto">Articulo que se va a registrar en la base de datos</param>
    /// <returns>Confirmacion del registro del articulo</returns>
      
    [Authorize(Roles = "Administrador")]
    [HttpPost]
    public async Task<ActionResult<Articulo>> CreateArticulo([FromForm] CreateArticuloDto createArticuloDto)
    {
        var articulo = _mapper.Map<Articulo>(createArticuloDto);
        var usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
        articulo.UsuarioUltimaModificacionId = usuario.Id;
        if (createArticuloDto.Imagen != null)
        {
            var imageResult = await _imageService.AddImage(createArticuloDto.Imagen);
            if (imageResult.Error != null) return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
            articulo.Imagen = imageResult.SecureUrl.ToString();
            articulo.PublicId = imageResult.PublicId;
        }

        _context.Articulo.Add(articulo);

        var result = await _context.SaveChangesAsync() > 0;

        var articuloDto = _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .First(x => x.Id == articulo.Id);
        if (result) return CreatedAtRoute("GetArticulo", new {Id = articuloDto.Id}, articuloDto);
        return BadRequest(new ProblemDetails {Title = "Problema creando el articulo"});
    }


    /// <summary>
    /// Se realiza una actualizacion de un articulo en la base de datos. Utiliza token para verificar su uso
    /// </summary>
    /// <param name="updateDto">Datos del articulo que se van a actualizar</param>
    /// <param name="id">ID del articulo que se va a actualizar</param>
    /// <returns>Confirmacion de actualizacion de articulo</returns>
   
    [Authorize(Roles = "Administrador")]
    [HttpPatch("{id}")]
    public async Task<ActionResult<ArticuloDto>> UpdateArticulo([FromForm] UpdateArticuloDto updateDto, int id)
    {
        var articulo = await _context.Articulo.Include(x => x.UsuarioUltimaModificacion).FirstAsync(x => x.Id == id);
        var usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

        if (articulo == null) return NotFound();

        MappingArticulo(updateDto, articulo);
        articulo.UsuarioUltimaModificacionId = usuario.Id;
        if (updateDto.Imagen != null)
        {
            var imageResult = await _imageService.AddImage(updateDto.Imagen);
            if (imageResult.Error != null) return BadRequest(new ProblemDetails {Title = imageResult.Error.Message});
            if (!string.IsNullOrEmpty(articulo.PublicId)) await _imageService.DeleteImage(articulo.PublicId);
            articulo.Imagen = imageResult.SecureUrl.ToString();
            articulo.PublicId = imageResult.PublicId;
        }

        var result = await _context.SaveChangesAsync() > 0;
        var articuloDto = _context.Articulo.ProjectTo<ArticuloDto>(_mapper.ConfigurationProvider)
            .First(x => x.Id == articulo.Id);
        if (result) return CreatedAtRoute("GetArticulo", new {Id = articuloDto.Id}, articuloDto);

        return BadRequest(new ProblemDetails {Title = "Problema actualizando el articulo"});
    }

    /// <summary>
    /// Eliminacion de un articulo de la base de datos. Requiere autorizacion y rol de administrador
    /// </summary>
    /// <param name="id">Id del articulo a eliminar</param>
    /// <returns>Confirmacion de eliminacion de articulo</returns>

    [Authorize(Roles = "Administrador")]
    [HttpDelete("{id}")]
    public async Task<ActionResult<ArticuloDto>> DeleteArticulo(int id)
    {
        var articulo = await _context.Articulo.FirstAsync(x => x.Id == id);

        if (articulo == null) return NotFound();
        articulo.Activo = false;
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok("Articulo elimilado correctamente");

        return BadRequest(new ProblemDetails {Title = "Problema eliminando el articulo"});
    }

    /// <summary>
    /// TBD
    /// </summary>
    /// <param name="updateDto"></param>
    /// <param name="articulo"></param>

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