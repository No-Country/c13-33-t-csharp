using HomeFix.Model;
using Microsoft.EntityFrameworkCore;
using System.CodeDom;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

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
                new Rol {Id = 1, Name = "Member", NormalizedName = "MEMBER", Descripcion = "Miembro"},
                new Rol {Id = 2, Name = "Admin", NormalizedName = "ADMIN", Descripcion = "Admin"}
            );

    }

    public DbSet<Imagen> Imagenes { get; set; }

    public DbSet<Marca> Marcas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Subcategoria> Subcategorias { get; set; }
    public DbSet<Movimiento> Movimientos { get; set;}
    public DbSet<MovimientoDetalle> MovimientosDetalle { get; set; }
    public DbSet<Articulo> Articulo { get; set; }

}
