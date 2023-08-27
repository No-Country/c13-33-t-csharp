using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Imagen
    {
        public int Id { get; set; }
        [Required]
        public int ArticuloId { get; set; }
        [Required]
        public string Ubicacion { get; set; }
        
    }
}
