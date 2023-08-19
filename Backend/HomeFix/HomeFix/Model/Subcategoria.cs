using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Subcategoria
    {
        public int Id { get; set; }
        
        [Required]
        public int IdCategoria { get; set; }

        [Required]
        public string Nombre { get; set; } 
    }
}
