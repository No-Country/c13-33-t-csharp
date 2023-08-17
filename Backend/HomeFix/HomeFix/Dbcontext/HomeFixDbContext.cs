using HomeFix.Model;
using Microsoft.EntityFrameworkCore;
using System.CodeDom;
using System.Reflection;

namespace HomeFix.Dbcontext;

public class HomeFixDbContext : DbContext
{
    public HomeFixDbContext(DbContextOptions options) : base(options)
    {
        
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

    }
    public DbSet<Rol> Roles { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Marca> Marcas { get; set; }
    public DbSet<Categoria> Categorias { get; set; }
}
