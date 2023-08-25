using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Fixdatabase1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articulo_Movimientos_MovimientoId",
                table: "Articulo");

            migrationBuilder.DropIndex(
                name: "IX_Articulo_MovimientoId",
                table: "Articulo");

            migrationBuilder.DropColumn(
                name: "MovimientoId",
                table: "Articulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MovimientoId",
                table: "Articulo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articulo_MovimientoId",
                table: "Articulo",
                column: "MovimientoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articulo_Movimientos_MovimientoId",
                table: "Articulo",
                column: "MovimientoId",
                principalTable: "Movimientos",
                principalColumn: "Id");
        }
    }
}
