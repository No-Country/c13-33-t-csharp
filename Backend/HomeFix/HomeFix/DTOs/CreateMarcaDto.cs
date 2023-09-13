using System.ComponentModel.DataAnnotations;

namespace HomeFix.DTOs;

public class CreateMarcaDto
{
    [Required]
    [MaxLength(50)]
    public string Nombre { get; set; }
}