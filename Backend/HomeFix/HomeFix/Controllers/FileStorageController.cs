using HomeFix.Model;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;



public class FileStorageController : BaseController
{
    private readonly HelperUploadFiles helperUploadFiles;
    private readonly IConfiguration configuration;
    private readonly UserManager<Usuario> _userManager;

    public FileStorageController(HelperUploadFiles helperUploadFiles, IConfiguration configuration, UserManager<Usuario> userManager)
    {
        this.helperUploadFiles = helperUploadFiles;
        this.configuration = configuration;
        _userManager = userManager;
    }

    //[Authorize(Roles = "Admin")]
    [AllowAnonymous]
    [HttpPost]

    public async Task<string> Index(IFormFile imagen, int ubicacion)
    {
        if(imagen is null)
        {
            BadRequest("No se ha seleccionado ninguna imagen");
            return "No se ha seleccionado ninguna imagen";
        }
        string nombreImagen = imagen.FileName;

        string path = "";

        switch (ubicacion)
        {
            case 0:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, nombreImagen, Folders.Uploads);
                break;
            case 1:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, nombreImagen, Folders.Images);
                break;
            case 2:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, nombreImagen, Folders.Documents);
                break;
            case 3:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, nombreImagen, Folders.Temp);
                break;
        }

        var result = path;
        return path;

    }


}
