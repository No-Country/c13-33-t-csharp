using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Marca
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Nombre { get; set; }

        public List<Articulo> Articulos { get; set; }
    }
}
