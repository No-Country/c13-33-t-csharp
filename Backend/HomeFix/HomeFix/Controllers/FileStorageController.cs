using HomeFix.Model;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;


[ApiController]
[Route("api/[controller]")]
public class FileStorageController : ControllerBase
{
    private readonly IFileStorageService _fileStorageService;
    private readonly IConfiguration configuration;
    private readonly UserManager<Usuario> _userManager;

    public FileStorageController(IFileStorageService fileStorageService, IConfiguration configuration, UserManager<Usuario> userManager)
    {
        _fileStorageService = fileStorageService;
        this.configuration = configuration;
        _userManager = userManager;
    }

    //[Authorize(Roles = "Admin")]
    [AllowAnonymous]
    [HttpPost]

    public async Task<IActionResult> Index(IFormFile imagen, int ubicacion, string filenName)
    {
        if(imagen is null)
        {
            return BadRequest("No se ha seleccionado ninguna imagen");
            
        }
        var result = await _fileStorageService.UploadFile(imagen, ubicacion, filenName);

        if (string.IsNullOrEmpty(result))
        {
            return BadRequest("No se ha podido subir la imagen");
        }
        return Ok(result);
    }


}
