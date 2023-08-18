using HomeFix.Model;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Dbcontext;

public class SeedData
{
    public static async Task Initialize(HomeFixDbContext context, UserManager<Usuario> userManager)
    {
        if (!userManager.Users.Any())
        {
            var admin = new Usuario
            {
                UserName = "AdminTest",
                Email = "admin@test.com",
                Nombre = "Random",
                Apellido = "Apellido"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd123");
            await userManager.AddToRoleAsync(admin, "Admin");
            var usuario = new Usuario
            {
                UserName = "UsuarioTest",
                Email = "usuario@test.com",
                Nombre = "Random",
                Apellido = "Apellido"
            };
            await userManager.CreateAsync(usuario, "Pa$$w0rd123");
            await userManager.AddToRoleAsync(usuario, "Admin");
        }

        context.SaveChanges();
    }

}