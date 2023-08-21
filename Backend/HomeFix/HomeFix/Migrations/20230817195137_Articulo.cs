using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Articulo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MovimientoDetalle",
                table: "MovimientoDetalle");

            migrationBuilder.RenameTable(
                name: "MovimientoDetalle",
                newName: "MovimientosDetalle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovimientosDetalle",
                table: "MovimientosDetalle",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Articulo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Imagen = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Cantidad = table.Column<int>(type: "int", maxLength: 500, nullable: false),
                    Precio = table.Column<double>(type: "float", nullable: false),
                    IdCategoria = table.Column<int>(type: "int", nullable: false),
                    IdMarca = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Articulo", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Articulo");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MovimientosDetalle",
                table: "MovimientosDetalle");

            migrationBuilder.RenameTable(
                name: "MovimientosDetalle",
                newName: "MovimientoDetalle");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MovimientoDetalle",
                table: "MovimientoDetalle",
                column: "Id");
        }
    }
}
