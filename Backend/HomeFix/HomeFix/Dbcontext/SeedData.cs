using HomeFix.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NpgsqlTypes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using HomeFix.Migrations;

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
        List<Marca> marcas = new List<Marca>();
        if (!context.Marcas.Any())
        {

            marcas = new List<Marca>()
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

        }



        List<Categoria> categoria = new List<Categoria>();
        if (!context.Categorias.Any())
        {
            categoria = new List<Categoria>
            {
                new Categoria
                {
                    Id = 1,
                    Nombre = "Herramientas",


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
        }
        if (context.Categorias.FirstOrDefault(x => x.CategoriaPadreId.HasValue) is null)
        {
            List<Categoria> categorias = new List<Categoria>()
            {

            new Categoria
            {
                Id = 4,
                Nombre = "Lamparas de exterior",
                CategoriaPadreId = 2


            },
                new Categoria
                {
                    Id = 5,
                    Nombre = "Lamparas interior",
                    CategoriaPadreId = 2
                },
                new Categoria
                {
                    Id = 6,
                    Nombre = "Puerta",
                    CategoriaPadreId= 3

                },
                new Categoria
                {
                    Id = 7,
                    Nombre = "Mesas",
                    CategoriaPadreId= 3

                },
                new Categoria
                {
                    Id = 8,
                    Nombre = "Bajo mesada",
                       CategoriaPadreId= 3

                },
            };
            categoria.AddRange(categorias);
        }


        List<Articulo> articulos = new List<Articulo>();
        if (!context.Articulo.Any())
        {


            articulos = new List<Articulo>
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
                    CategoriaId = 6,
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
                    CategoriaId = 6,
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
                    CategoriaId = 5,
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
                    CategoriaId = 5,
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
                    CategoriaId = 6,
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
        };
        List<Movimiento> movimientos = new List<Movimiento>();
        if (!context.Movimientos.Any())
        {
            movimientos = new List<Movimiento>()
            {
                new Movimiento()
                {
                    Id = 2,
                    UsuarioId = 1,
                    FechaYHora = DateTime.Now.ToUniversalTime(),
                    Descripcion = "Compra de articulos",
                    MovimientoDetalles = new List<MovimientoDetalle>()
                    {
                        new MovimientoDetalle()
                        {
                            Id = 1,
                            ArticuloId = 1,
                            Cantidad = 10,
                            PrecioUnitario = 20000,
                            MovimientoId = 2
                        },
                        new MovimientoDetalle()
                        {
                            Id = 2,
                            ArticuloId = 6,
                            Cantidad = 10,
                            PrecioUnitario = 4000,
                            MovimientoId = 2
                        }
                    },
                    PrecioTotal = 240000,

                },
                new Movimiento()
                {
                    Id = 1,
                    UsuarioId = 1,
                    FechaYHora = DateTime.Now.ToUniversalTime(),
                    Descripcion = "Compra de articulos",
                    MovimientoDetalles = new List<MovimientoDetalle>()
                    {
                        new MovimientoDetalle()
                        {
                            Id = 3,
                            ArticuloId = 1,
                            Cantidad = 3,
                            PrecioUnitario = 20000,
                            MovimientoId = 1
                        },
                        new MovimientoDetalle()
                        {
                            Id = 4,
                            ArticuloId = 2,
                            Cantidad = 3,
                            PrecioUnitario = 4000,
                            MovimientoId = 1
                        }
                    },
                    PrecioTotal = 212000,

                },
                new Movimiento()
                {
                    Id = 3,
                    UsuarioId = 1,
                    FechaYHora = DateTime.Now.AddMonths(-2).ToUniversalTime(),
                    Descripcion = "Compra de articulos",
                    MovimientoDetalles = new List<MovimientoDetalle>()
                    {
                        new MovimientoDetalle()
                        {
                            Id = 5,
                            ArticuloId = 4,
                            Cantidad = 10,
                            PrecioUnitario = 20000,
                            MovimientoId = 3
                        },
                        new MovimientoDetalle()
                        {
                            Id = 6,
                            ArticuloId = 1,
                            Cantidad = 3,
                            PrecioUnitario = 4000,
                            MovimientoId = 3
                        }
                    },
                    PrecioTotal = 1000,

                },
                new Movimiento()
                {
                    Id = 4,
                    UsuarioId = 1,
                    FechaYHora = DateTime.Now.ToUniversalTime(),
                    Descripcion = "Compra de articulos",
                    MovimientoDetalles = new List<MovimientoDetalle>()
                    {
                        new MovimientoDetalle()
                        {
                            Id = 7,
                            ArticuloId = 1,
                            Cantidad = 3,
                            PrecioUnitario = 20000,
                            MovimientoId = 4
                        },
                        new MovimientoDetalle()
                        {
                            Id = 8,
                            ArticuloId = 4,
                            Cantidad = 3,
                            PrecioUnitario = 4000,
                            MovimientoId = 4
                        }
                    },
                    PrecioTotal = 212000,

                },


            };
            
        }
        List<Imagen> imagenes = new List<Imagen>();
        if (!context.Imagenes.Any())
        {
            imagenes = new List<Imagen>()
            {
                new Imagen()
                {
                    Id = 1,
                    ArticuloId = 1,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 2,
                    ArticuloId = 2,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 3,
                    ArticuloId = 2,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 4,
                    ArticuloId = 5,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 5,
                    ArticuloId = 6,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 6,
                    ArticuloId = 7,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 7,
                    ArticuloId = 3,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },new Imagen()
                {
                    Id = 8,
                    ArticuloId = 3,
                    Ubicacion = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.xataka.com%2Fservicios%2Fgoogle-cambia-de-imagen-la-simplicidad-por-estandarte&psig=AOvVaw08kd84zNc2ta-PTkHEs8kz&ust=1693227896240000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCJi5t8zz_IADFQAAAAAdAAAAABAE"
                },
            };
        }
       

        //context.Subcategorias.AddRange(subcategoria);
        context.Marcas.AddRange(marcas);
        context.Categorias.AddRange(categoria);
        context.Articulo.AddRange(articulos);
        context.Movimientos.AddRange(movimientos);
        context.Imagenes.AddRange(imagenes);
        context.SaveChanges();
    }
}