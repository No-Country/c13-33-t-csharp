using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class ArticuloImagen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes");

            migrationBuilder.DropIndex(
                name: "IX_Imagenes_ArticuloId",
                table: "Imagenes");

            migrationBuilder.AddColumn<string>(
                name: "Imagen",
                table: "Articulo",
                type: "character varying(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Administrador");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Imagen",
                table: "Articulo");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "administrador");

            migrationBuilder.CreateIndex(
                name: "IX_Imagenes_ArticuloId",
                table: "Imagenes",
                column: "ArticuloId");

            migrationBuilder.AddForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes",
                column: "ArticuloId",
                principalTable: "Articulo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
