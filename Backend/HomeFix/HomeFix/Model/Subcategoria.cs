using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Subcategoria
    {
        public int Id { get; set; }
        
        [Required]
        public int CategoriaId { get; set; }
        
        public Categoria Categoria { get; set; }

        [Required]
        public string Nombre { get; set; } 
        public List<Articulo> Articulos { get; set; }
    }
}
