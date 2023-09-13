using HomeFix.Data;
using HomeFix.Helpers;
using HomeFix.Interfaces;
using HomeFix.Services;
using HomeFix.Services.FileStorage;

namespace HomeFix.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IFileStorageService, FileStorageService>();
        services.AddScoped<PathProvider>();
        services.AddScoped<HelperUploadFiles>();
        services.AddScoped<ImageService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddCors();
        services.AddAuthorization();
        services.AddScoped<TokenService>();
        
        return services;
    }
}