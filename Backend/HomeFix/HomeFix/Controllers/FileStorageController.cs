using System.Security.Claims;
using HomeFix.Interfaces;
using HomeFix.Model;
using HomeFix.Services;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;



public class FileStorageController : BaseController
{
    
    private readonly ImageService _imageService;
    private readonly IUnitOfWork _uow;

    public FileStorageController(ImageService imageService, IUnitOfWork uow)
    {
        _imageService = imageService;
        _uow = uow;
    }

    //[Authorize(Roles = "Admin")]
    [Authorize]
    [HttpPost]

    public async Task<IActionResult> Index(IFormFile imagen)
    {
        var usuario = await _uow.CuentaRepository.FindUserByEmail(User.FindFirstValue(ClaimTypes.Email));
        if(imagen is null)
        {
            return BadRequest("No se ha seleccionado ninguna imagen");
            
        }
        var result =  await _imageService.AddImage(imagen);
        

        if (result.Error != null) 
        {
            return BadRequest("No se ha podido subir la imagen");
        }
        
        usuario.ImagenPerfil = result.SecureUrl.ToString();
        
        if (await _uow.Complete()) return Ok(result);
        
        return BadRequest(new ProblemDetails {Title = "Problema guardando la imagen"});
    }


}
