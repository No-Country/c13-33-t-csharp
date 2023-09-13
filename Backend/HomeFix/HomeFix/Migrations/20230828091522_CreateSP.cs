using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeFix.Migrations
{
    /// <inheritdoc />
    public partial class CreateSP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"CREATE OR REPLACE FUNCTION JsonImagessForArticuloId(ArticuloId int) RETURNS jsonb AS $$
DECLARE
    images_json jsonb;
BEGIN
    SELECT json_agg(json_build_object(
		
        'imagen_id', public.""Imagenes"".""Id"",
        
        'ruta',public.""Imagenes"".""Ubicacion""
    )) INTO images_json
    FROM public.""Imagenes""
    WHERE public.""Imagenes"".""ArticuloId"" = ArticuloId;
    
    RETURN images_json;
END;
$$ LANGUAGE plpgsql;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP FUNCTION public.jsonimagesforid(integer);");
        }
    }
}
