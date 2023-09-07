using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class articulospormes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE VIEW MasVendidosPorMes AS SELECT DATE_TRUNC('month', public.""Movimientos"".""FechaYHora"") AS Fecha, ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"" ,SUM(""MovimientosDetalle"".""Cantidad"") as Cantidad,SUM(""MovimientosDetalle"".""Cantidad"" * ""MovimientosDetalle"".""PrecioUnitario"") as Monto , jsonimagessforarticuloid(""MovimientosDetalle"".""ArticuloId"") as Imagenes
FROM public.""MovimientosDetalle""
JOIN public.""Movimientos"" ON ""MovimientosDetalle"".""MovimientoId"" = ""Movimientos"".""Id""
JOIN public.""Articulo"" ON ""MovimientosDetalle"".""ArticuloId"" = public.""Articulo"".""Id""
GROUP BY ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"", DATE_TRUNC('month',public.""Movimientos"".""FechaYHora"");


");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Dop View if exists MasVendidosPorMes;");
        }
    }
}
