using HomeFix.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Services.FileStorage;

public interface IFileStorageService
{
    Task<string> UploadFile(IFormFile imagen, int ubicacion, string fileName);
}
public class FileStorageService : IFileStorageService
{
    private readonly HelperUploadFiles helperUploadFiles;
    

    public FileStorageService(HelperUploadFiles helperUploadFiles)
    {
        this.helperUploadFiles = helperUploadFiles;


    }
    public async Task<string> UploadFile(IFormFile imagen, int ubicacion, string fileName)
    {
        if (imagen is null)
        {
            return "";

        }
        
        if (string.IsNullOrEmpty(fileName))
        {
            fileName = imagen.FileName;
        }
        

        string path = "";

        switch (ubicacion)
        {
            case 0:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, fileName, Folders.Uploads);
                break;
            case 1:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, fileName, Folders.Images);
                break;
            case 2:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, fileName, Folders.Documents);
                break;
            case 3:
                path = await this.helperUploadFiles.UploadFilesAsync(imagen, fileName, Folders.Temp);
                break;
        }
        return path;

    }





}
