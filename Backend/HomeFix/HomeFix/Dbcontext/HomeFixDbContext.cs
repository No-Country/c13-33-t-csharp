using HomeFix.Model;
using Microsoft.EntityFrameworkCore;
using System.CodeDom;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HomeFix.DTOs;
using HomeFix.Migrations;

namespace HomeFix.Dbcontext;

public class HomeFixDbContext : IdentityDbContext <Usuario, Rol, int>
{
    public HomeFixDbContext(DbContextOptions options) : base(options)
    {
        
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

       
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        modelBuilder.Entity<Rol>()
            .HasData(
                new Rol {Id = 1, Name = "Trabajador", NormalizedName = "TRABAJADOR", Descripcion = "Trabajador "},
                new Rol {Id = 2, Name = "Administrador", NormalizedName = "ADMINISTRADOR", Descripcion = "Administrador"}
            );
     

        modelBuilder.Entity<Articulo>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<Movimiento>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<MovimientoDetalle>().Property(b => b.Id).HasIdentityOptions(startValue: 15);



        modelBuilder.Entity<ArticuloMasVendidoDto>().HasNoKey().ToView("productomasvendidopormes");
        modelBuilder.Entity<VentasPorMes>().HasNoKey().ToView("ventasultimos6meses");
        modelBuilder.Entity<VentaMes>().HasNoKey().ToView("ventasmes");

    }

    public DbSet<Imagen> Imagenes { get; set; }

    public DbSet<Marca> Marcas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    //public DbSet<Subcategoria> Subcategorias { get; set; }
    public DbSet<Movimiento> Movimientos { get; set;}
    public DbSet<MovimientoDetalle> MovimientosDetalle { get; set; }
    public DbSet<Articulo> Articulo { get; set; }

   

}
