using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class VentasUltimosMeses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR REPLACE VIEW VentasUltimos6Meses AS SELECT
    EXTRACT(YEAR FROM ""FechaYHora"") AS Anio,
    EXTRACT(MONTH FROM ""FechaYHora"") AS Mes,
    SUM(""PrecioTotal"") AS SumaPrecioTotal
FROM
    ""Movimientos""
WHERE
    ""FechaYHora"" >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY
    EXTRACT(YEAR FROM ""FechaYHora""),
    EXTRACT(MONTH FROM ""FechaYHora"")
ORDER BY
    EXTRACT(YEAR FROM ""FechaYHora""),
    EXTRACT(MONTH FROM ""FechaYHora"");");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("Dop View if exists VentasUltimos6Meses;");
        }
    }
}
