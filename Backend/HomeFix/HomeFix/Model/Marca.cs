using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Marca
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }
        [MaxLength(500)]
        public string Icono { get; set; }
    }
}
