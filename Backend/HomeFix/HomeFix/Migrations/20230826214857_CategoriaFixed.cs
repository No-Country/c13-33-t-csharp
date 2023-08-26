using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class CategoriaFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Categorias");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Categorias",
                type: "integer",
                nullable: true);
        }
    }
}
