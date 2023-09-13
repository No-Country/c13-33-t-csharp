using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace HomeFix.Services;

public class ImageService
{
    private readonly Cloudinary _cloudinary;

    public ImageService(IConfiguration config)
    {
        var account = new Account(config["Cloudinary:CloudName"], config["Cloudinary:ApiKey"],
            config["Cloudinary:ApiSecret"]);

        _cloudinary = new Cloudinary(account);
    }

    public async Task<ImageUploadResult> AddImage(IFormFile file)
    {
        var uploadResult = new ImageUploadResult();
        if (file.Length > 0)
        {
            using var stream = file.OpenReadStream();
            var uploadParam = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream)
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParam);
        }

        return uploadResult;
    }
    public async Task<DeletionResult> DeleteImage(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);

        return result;
    }
}