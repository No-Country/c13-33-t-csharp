using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Subcategoria
    {
        public int Id { get; set; }
        
     
        public int CategoriaId { get; set; }
        public List<Categoria> Categoria { get; set; }
        
        [Required]
        public string Nombre { get; set; } 
      
        
       
        
    }
}
