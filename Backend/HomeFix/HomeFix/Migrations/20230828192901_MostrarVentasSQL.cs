using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class MostrarVentasSQL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR REPLACE VIEW VentasMes AS SELECT
    SUM(su.""PrecioTotal""),
    SUM(su.""cantidad"") as productosVendidos
FROM (
    SELECT
        m.""PrecioTotal"",
        SUM(md.""Cantidad"") AS cantidad
    FROM public.""Movimientos"" AS m
    LEFT JOIN public.""MovimientosDetalle"" AS md ON m.""Id"" = md.""MovimientoId""
    WHERE EXTRACT(MONTH FROM m.""FechaYHora"") = EXTRACT(MONTH FROM CURRENT_DATE)
    GROUP BY m.""PrecioTotal"", m.""Id""
) AS su;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP VIEW IF EXISTS VentasMes;");
        }
    }
}
