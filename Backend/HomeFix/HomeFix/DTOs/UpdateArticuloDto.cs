using System.ComponentModel.DataAnnotations;

namespace HomeFix.DTOs;

public class UpdateArticuloDto
{
    public string Nombre { get; set; }


    public string Descripcion { get; set; } = null;


    public int? Cantidad { get; set; } = null;

    public int? CantidadMinima { get; set; } = null;


    public decimal? Costo { get; set; } = null;


    public decimal? Peso { get; set; } = null;


    public decimal? Alto { get; set; } = null;


    public decimal? Ancho { get; set; } = null;


    public IFormFile Imagen { get; set; } = null;
    public int? MarcaId { get; set; } = null;

    public int? CategoriaId { get; set; } = null;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}