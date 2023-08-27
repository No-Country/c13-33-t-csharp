using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Fixdatabase1234 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Articulo_Categorias_CategoriaId",
                table: "Articulo");

            migrationBuilder.DropIndex(
                name: "IX_Articulo_CategoriaId",
                table: "Articulo");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Articulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Articulo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Articulo_CategoriaId",
                table: "Articulo",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Articulo_Categorias_CategoriaId",
                table: "Articulo",
                column: "CategoriaId",
                principalTable: "Categorias",
                principalColumn: "Id");
        }
    }
}
