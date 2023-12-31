using System.ComponentModel.DataAnnotations;
using HomeFix.Model;

namespace HomeFix.DTOs;

public class CreateArticuloDto
{
    public string Nombre { get; set; }
    [Required] [MaxLength(500)] public string Descripcion { get; set; }

    [Required] public int Cantidad { get; set; }

    [Required] public int CantidadMinima { get; set; }

    [Required] public decimal Costo { get; set; }
    
    [Required]
    public int MarcaId { get; set; }
    [Required]
    public int CategoriaId { get; set; }
    
    public decimal Peso { get; set; }


    public decimal Alto { get; set; }


    public decimal Ancho { get; set; }


    public IFormFile Imagen { get; set; }
    

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}