using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Categoria
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }
  
        public Subcategoria? Subcategoria { get; set; }
        public int? SubcategoriaId { get; set; }
        
    }
}
