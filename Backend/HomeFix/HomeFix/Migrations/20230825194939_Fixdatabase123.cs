using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class Fixdatabase123 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes");

            migrationBuilder.DropForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategorias_Categorias_CategoriaId",
                table: "Subcategorias");

            migrationBuilder.DropColumn(
                name: "IdCategoria",
                table: "Subcategorias");

            migrationBuilder.DropColumn(
                name: "IdMovimiento",
                table: "MovimientosDetalle");

            migrationBuilder.DropColumn(
                name: "IdUsuario",
                table: "Movimientos");

            migrationBuilder.DropColumn(
                name: "IdArticulo",
                table: "Imagenes");

            migrationBuilder.RenameColumn(
                name: "IdProducto",
                table: "MovimientosDetalle",
                newName: "ProductoId");

            migrationBuilder.AlterColumn<int>(
                name: "CategoriaId",
                table: "Subcategorias",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "MovimientoId",
                table: "MovimientosDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Movimientos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ArticuloId",
                table: "Imagenes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes",
                column: "ArticuloId",
                principalTable: "Articulo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle",
                column: "MovimientoId",
                principalTable: "Movimientos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategorias_Categorias_CategoriaId",
                table: "Subcategorias",
                column: "CategoriaId",
                principalTable: "Categorias",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes");

            migrationBuilder.DropForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos");

            migrationBuilder.DropForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle");

            migrationBuilder.DropForeignKey(
                name: "FK_Subcategorias_Categorias_CategoriaId",
                table: "Subcategorias");

            migrationBuilder.RenameColumn(
                name: "ProductoId",
                table: "MovimientosDetalle",
                newName: "IdProducto");

            migrationBuilder.AlterColumn<int>(
                name: "CategoriaId",
                table: "Subcategorias",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdCategoria",
                table: "Subcategorias",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "MovimientoId",
                table: "MovimientosDetalle",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdMovimiento",
                table: "MovimientosDetalle",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "UsuarioId",
                table: "Movimientos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdUsuario",
                table: "Movimientos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ArticuloId",
                table: "Imagenes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "IdArticulo",
                table: "Imagenes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Imagenes_Articulo_ArticuloId",
                table: "Imagenes",
                column: "ArticuloId",
                principalTable: "Articulo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movimientos_AspNetUsers_UsuarioId",
                table: "Movimientos",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MovimientosDetalle_Movimientos_MovimientoId",
                table: "MovimientosDetalle",
                column: "MovimientoId",
                principalTable: "Movimientos",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Subcategorias_Categorias_CategoriaId",
                table: "Subcategorias",
                column: "CategoriaId",
                principalTable: "Categorias",
                principalColumn: "Id");
        }
    }
}
