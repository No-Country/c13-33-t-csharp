﻿using HomeFix.Model;
using Microsoft.EntityFrameworkCore;
using System.CodeDom;
using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using HomeFix.DTOs;
using HomeFix.Migrations;

namespace HomeFix.Dbcontext;

public class HomeFixDbContext : IdentityDbContext<Usuario, Rol, int>
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
                new Rol
                {
                    Id = 2, Name = "Administrador", NormalizedName = "ADMINISTRADOR", Descripcion = "Administrador"
                }
            );
        // modelBuilder.Entity<Subcategorias>(x=> x.HasKey(c=> new {c.CategoriaId, c.SubcategoriaId}));
        // modelBuilder.Entity<Subcategorias>()
        //     .HasMany(c => c.Categoria)
        //     .WithOne(s => s.Subcategoria);
        // modelBuilder.Entity<Subcategorias>()
        //     .HasOne(c => c.Subcategoria)
        //     .WithMany(s => s.);

        


        modelBuilder.Entity<Articulo>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<Marca>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<Categoria>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<Movimiento>().Property(b => b.Id).HasIdentityOptions(startValue: 10);
        modelBuilder.Entity<MovimientoDetalle>().Property(b => b.Id).HasIdentityOptions(startValue: 200);


        modelBuilder.Entity<ArticuloMasVendidoDto>().HasNoKey().ToView("productomasvendidopormes");
        modelBuilder.Entity<VentasPorMes>().HasNoKey().ToView("ventasultimos6meses");
        modelBuilder.Entity<VentaMes>().HasNoKey().ToView("ventasmes");
        // modelBuilder.Entity<ArticuloPorMesDto>().HasNoKey().ToView("articulosvendidospormes");
        // modelBuilder.Entity<ArticuloMasVendidoFunctionDto>().HasNoKey().ToFunction("artvendidospormes");

     
    }

    
    
    

    public DbSet<Imagen> Imagenes { get; set; }

    public DbSet<Marca> Marcas { get; set; }

    public DbSet<Categoria> Categorias { get; set; }

    //public DbSet<Subcategoria> Subcategorias { get; set; }
    public DbSet<Movimiento> Movimientos { get; set; }
    public DbSet<MovimientoDetalle> MovimientosDetalle { get; set; }
    public DbSet<Articulo> Articulo { get; set; }
    
}

