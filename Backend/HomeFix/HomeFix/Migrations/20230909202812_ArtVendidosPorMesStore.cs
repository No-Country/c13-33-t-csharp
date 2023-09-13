using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class ArtVendidosPorMesStore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE PROCEDURE artvendpormes(mes integer)
LANGUAGE 'plpgsql'
as $$
BEGIN
perform DATE_TRUNC('month',public.""Movimientos"".""FechaYHora""), ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"" ,SUM(""MovimientosDetalle"".""Cantidad""),SUM(""MovimientosDetalle"".""Cantidad"" * ""MovimientosDetalle"".""PrecioUnitario"") as total, ""MovimientosDetalle"".""PrecioUnitario"" as precio_unitario
            FROM public.""MovimientosDetalle""
        JOIN public.""Movimientos"" ON ""MovimientosDetalle"".""MovimientoId"" = ""Movimientos"".""Id""
        JOIN public.""Articulo"" ON ""MovimientosDetalle"".""ArticuloId"" = public.""Articulo"".""Id""
        WHERE EXTRACT(MONTH FROM public.""Movimientos"".""FechaYHora"") = $1
        GROUP BY ""MovimientosDetalle"".""ArticuloId"", public.""Articulo"".""Nombre"", DATE_TRUNC('month',public.""Movimientos"".""FechaYHora""), ""MovimientosDetalle"".""PrecioUnitario"";

        END;
        $$;
        ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP FUNCTION public.artvendpormes(integer);");
        }
    }
}
