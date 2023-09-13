using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Categorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorias_Subcategorias_SubcategoriaId",
                table: "Categorias");

            migrationBuilder.DropTable(
                name: "Subcategorias");

            migrationBuilder.RenameColumn(
                name: "SubcategoriaId",
                table: "Categorias",
                newName: "CategoriaPadreId");

            migrationBuilder.RenameIndex(
                name: "IX_Categorias_SubcategoriaId",
                table: "Categorias",
                newName: "IX_Categorias_CategoriaPadreId");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Categorias",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Categorias_Categorias_CategoriaPadreId",
                table: "Categorias",
                column: "CategoriaPadreId",
                principalTable: "Categorias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorias_Categorias_CategoriaPadreId",
                table: "Categorias");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Categorias");

            migrationBuilder.RenameColumn(
                name: "CategoriaPadreId",
                table: "Categorias",
                newName: "SubcategoriaId");

            migrationBuilder.RenameIndex(
                name: "IX_Categorias_CategoriaPadreId",
                table: "Categorias",
                newName: "IX_Categorias_SubcategoriaId");

            migrationBuilder.CreateTable(
                name: "Subcategorias",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CategoriaId = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subcategorias", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Categorias_Subcategorias_SubcategoriaId",
                table: "Categorias",
                column: "SubcategoriaId",
                principalTable: "Subcategorias",
                principalColumn: "Id");
        }
    }
}
