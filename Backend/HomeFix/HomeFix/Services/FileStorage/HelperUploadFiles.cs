
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using System.IO;


namespace HomeFix.Services.FileStorage;

public class HelperUploadFiles
{
    private PathProvider pathProvider;
    private readonly IConfiguration _configuration;

    

    public HelperUploadFiles(PathProvider pathProvider, IConfiguration configuration)
    {
        this.pathProvider = pathProvider;
        _configuration = configuration;
    }

    public async Task<String> UploadFilesAsync(IFormFile formFile, string nombreImagen, Folders folder)
    {
        string path = this.pathProvider.MapPath(nombreImagen, folder);

        using (Stream stream = new FileStream(path, FileMode.Create))
        {
            await formFile.CopyToAsync(stream);
        }

        return path;

    }
}