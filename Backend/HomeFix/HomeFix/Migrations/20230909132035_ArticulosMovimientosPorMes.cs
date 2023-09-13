using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class ArticulosMovimientosPorMes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR REPLACE VIEW articulosvendidospormes AS SELECT EXTRACT(month from public.""Movimientos"".""FechaYHora"") AS mes,EXTRACT(YEAR from public.""Movimientos"".""FechaYHora"") as anio, ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"" ,SUM(""MovimientosDetalle"".""Cantidad"") as Cantidad,SUM(""MovimientosDetalle"".""Cantidad"" * ""MovimientosDetalle"".""PrecioUnitario"") as total, ""MovimientosDetalle"".""PrecioUnitario"" as precio_unitario  
            FROM public.""MovimientosDetalle""
        JOIN public.""Movimientos"" ON ""MovimientosDetalle"".""MovimientoId"" = ""Movimientos"".""Id""
        JOIN public.""Articulo"" ON ""MovimientosDetalle"".""ArticuloId"" = public.""Articulo"".""Id""
        GROUP BY ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"", EXTRACT(month from public.""Movimientos"".""FechaYHora""),EXTRACT(YEAR from public.""Movimientos"".""FechaYHora""), ""MovimientosDetalle"".""PrecioUnitario"";
            ");
        }
        

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW IF EXISTS articulosvendidospormes;");
        }
    }
}
