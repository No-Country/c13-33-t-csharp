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
            await userManager.AddToRoleAsync(usuario, "Member");
        }

        if (context.Marcas.Any()) return;

        var marcas = new List<Marca>()
        {
            new Marca
            {
                Id = 1,
                Nombre = "Robust"
            },
            new Marca
            {
                Id = 2,
                Nombre = "Abitare"
            },
            new Marca
            {
                Id = 3,
                Nombre = "Vento"
            },
            new Marca
            {
                Id = 4,
                Nombre = "Baldara"
            }
            
        };
      
        if (context.Categorias.Any()) return;

        var subcategoria = new List<Subcategoria>
        {
            new Subcategoria
            {
                Id = 1,
                Nombre = "Herramientas Manuales",
                
            },
        };
        if (context.Categorias.Any()) return;
        
        var categoria = new List<Categoria>
        {
            new Categoria
            {
                Id = 1,
                Nombre = "Herramientas",
                SubcategoriaId = 1
                
            },
            new Categoria
            {
                Id = 2,
                Nombre = "Iluminacion"
            },
            new Categoria
            {
                Id = 3,
                Nombre = "Herramientas Manuales",
                
            },
        };
        
        
        var articulos = new List<Articulo>
        {
            new Articulo
            {
                Id = 1,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 2,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 3,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 4,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 5,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 6,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 7,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 8,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 9,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 10,
                Nombre = "Destornillador cruz",
                CategoriaId = 1,
                Descripcion = "Punta cruz imantada, que facilita el encaje de la punta en el tornillo",
                Cantidad = 18,
                CantidadMinima = 3,
                Costo = 2952,
                Precio = 3690,
                Peso = 0.082m,
                Ancho = 0,
                Alto = 0,
                MarcaId = 1
            },
           
        };
        
        context.Subcategorias.AddRange(subcategoria);
        context.Marcas.AddRange(marcas);
        context.Categorias.AddRange(categoria);
        context.Articulo.AddRange(articulos);
        context.SaveChanges();
    }
}