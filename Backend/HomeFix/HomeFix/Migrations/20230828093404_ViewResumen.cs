using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class ViewResumen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR REPLACE VIEW ProductoMasVendidoPorMes AS SELECT ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"" ,SUM(""MovimientosDetalle"".""Cantidad"") as Cantidad,SUM(""MovimientosDetalle"".""Cantidad"" * ""MovimientosDetalle"".""PrecioUnitario"") as Monto ,  jsonimagessforarticuloid(""MovimientosDetalle"".""ArticuloId"") as Imagenes  
FROM public.""MovimientosDetalle""
JOIN public.""Movimientos"" ON ""MovimientosDetalle"".""MovimientoId"" = ""Movimientos"".""Id""
JOIN public.""Articulo"" ON ""MovimientosDetalle"".""ArticuloId"" = public.""Articulo"".""Id"" 
WHERE EXTRACT(MONTH FROM ""Movimientos"".""FechaYHora"") = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"";");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW IF EXISTS ProductoMasVendidoPorMes;");
        }
    }
}
