using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Categoria
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }
  
        public int CategoriaId { get; set; }
        public Categoria CategoriaPadre { get; set; }
        
    }
}
