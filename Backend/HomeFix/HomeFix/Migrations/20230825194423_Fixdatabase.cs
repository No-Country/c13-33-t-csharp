using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Fixdatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Icono",
                table: "Marcas");

            migrationBuilder.AddColumn<int>(
                name: "ArticuloId",
                table: "MovimientosDetalle",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MovimientoId",
                table: "MovimientosDetalle",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Movimientos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MovimientoId",
                table: "Articulo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MovimientosDetalle_ArticuloId",
                table: "MovimientosDetalle",
                column: "ArticuloId");

            migrationBuilder.CreateIndex(
                name: "IX_MovimientosDetalle_MovimientoId",
                table: "MovimientosDetalle",
                column: "MovimientoId");

            migrationBuilder.CreateIndex(
                name: "IX_Movimientos_UsuarioId",
                table: "Movimientos",
                column: "UsuarioId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovimientosDetalle_Articulo_ArticuloId",
                table: "MovimientosDetalle",
                column: "ArticuloId",
                principalTable: "Articulo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle",
                column: "MovimientoId",
                principalTable: "Movimientos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articulo_Movimientos_MovimientoId",
                table: "Articulo");

            migrationBuilder.DropForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_MovimientosDetalle_Articulo_ArticuloId",
                table: "MovimientosDetalle");

            migrationBuilder.DropForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle");

            migrationBuilder.DropIndex(
                name: "IX_MovimientosDetalle_ArticuloId",
                table: "MovimientosDetalle");

            migrationBuilder.DropIndex(
                name: "IX_MovimientosDetalle_MovimientoId",
                table: "MovimientosDetalle");

            migrationBuilder.DropIndex(
                name: "IX_Movimientos_UsuarioId",
                table: "Movimientos");

            migrationBuilder.DropIndex(
                name: "IX_Articulo_MovimientoId",
                table: "Articulo");

            migrationBuilder.DropColumn(
                name: "ArticuloId",
                table: "MovimientosDetalle");

            migrationBuilder.DropColumn(
                name: "MovimientoId",
                table: "MovimientosDetalle");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Movimientos");

            migrationBuilder.DropColumn(
                name: "MovimientoId",
                table: "Articulo");

            migrationBuilder.AddColumn<string>(
                name: "Icono",
                table: "Marcas",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: true);
        }
    }
}
