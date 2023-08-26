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
            await userManager.AddToRoleAsync(admin, "Administrador");
            var usuario = new Usuario
            {
                UserName = "UsuarioTest",
                Email = "usuario@test.com",
                Nombre = "Random",
                Apellido = "Apellido"
            };
            await userManager.CreateAsync(usuario, "Pa$$w0rd123");
            await userManager.AddToRoleAsync(usuario, "Trabajador");
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
                Nombre = "Hogar",
                
            },
        };
        
        
        var articulos = new List<Articulo>
        {
            new Articulo
            {
                Id = 1,
                Nombre = "Martillo Carpintero",
                CategoriaId = 1,
                Descripcion = "Martillo con Mango de Fibra de Vidrio",
                Cantidad = 18,
                CantidadMinima = 5,
                Costo = 2000,
                Precio = 3600,
                Peso = 0.042m,
                Ancho = 3,
                Alto = 10,
                MarcaId = 1
            },
            new Articulo
            {
                Id = 2,
                Nombre = "Puerta de pino",
                CategoriaId = 3,
                Descripcion = "Puerta reforzada de pino",
                Cantidad = 9,
                CantidadMinima = 2,
                Costo = 10000,
                Precio = 12000,
                Peso = 20.230m,
                Ancho = 3000,
                Alto = 10000,
                MarcaId = 3
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
                Nombre = "Puerta PVC",
                CategoriaId = 3,
                Descripcion = "Puerta de PVC",
                Cantidad = 12,
                CantidadMinima = 3,
                Costo = 7000,
                Precio = 9000,
                Peso = 15.380m,
                Ancho = 3000,
                Alto = 10000,
                MarcaId = 4
            },
            new Articulo
            {
                Id = 5,
                Nombre = "Lampara Pie",
                CategoriaId = 2,
                Descripcion = "Potencia de 30W, diametro de 25 cm y con tipo de soquete E22.",
                Cantidad = 15,
                CantidadMinima = 4,
                Costo = 3000,
                Precio = 3800,
                Peso = 0.90m,
                Ancho = 30,
                Alto = 40,
                MarcaId = 2
            },
            new Articulo
            {
                Id = 6,
                Nombre = "Lampara colgante",
                CategoriaId = 2,
                Descripcion = "Potencia de 40W, diametro de 20 cm y con tipo de soquete E27.",
                Cantidad = 18,
                CantidadMinima = 4,
                Costo = 32792,
                Precio = 40990,
                Peso = 3.5m,
                Ancho = 40,
                Alto = 29,
                MarcaId = 2
            },
            new Articulo
            {
                Id = 7,
                Nombre = "Puerta con ventana",
                CategoriaId = 3,
                Descripcion = "Puerta con ventana",
                Cantidad = 5,
                CantidadMinima = 1,
                Costo = 20000,
                Precio = 24000,
                Peso = 25.820m,
                Ancho = 3200,
                Alto = 11000,
                MarcaId = 3
            },
            
           
        };
        
        context.Subcategorias.AddRange(subcategoria);
        context.Marcas.AddRange(marcas);
        context.Categorias.AddRange(categoria);
        context.Articulo.AddRange(articulos);
        context.SaveChanges();
    }
}