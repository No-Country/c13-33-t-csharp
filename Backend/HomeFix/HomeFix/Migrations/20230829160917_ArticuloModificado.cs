using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class ArticuloModificado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UsuarioUltimaModificacionId",
                table: "Articulo",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Articulo_UsuarioUltimaModificacionId",
                table: "Articulo",
                column: "UsuarioUltimaModificacionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articulo_AspNetUsers_UsuarioUltimaModificacionId",
                table: "Articulo",
                column: "UsuarioUltimaModificacionId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articulo_AspNetUsers_UsuarioUltimaModificacionId",
                table: "Articulo");

            migrationBuilder.DropIndex(
                name: "IX_Articulo_UsuarioUltimaModificacionId",
                table: "Articulo");

            migrationBuilder.DropColumn(
                name: "UsuarioUltimaModificacionId",
                table: "Articulo");
        }
    }
}
