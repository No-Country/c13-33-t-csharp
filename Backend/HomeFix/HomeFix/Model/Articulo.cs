using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Articulo
    {
        public int Id { get; set; }
        [Required] [MaxLength(50)] public string Nombre { get; set; }
        [Required] [MaxLength(500)] public string Descripcion { get; set; }
        [Required] [MaxLength(50)] public string Imagen { get; set; }
        [Required] [MaxLength(500)] public int Cantidad { get; set; }

        [Required]
        [Range(0, Double.PositiveInfinity)]
        public double Precio { get; set; }

        public int IdCategoria { get; set; }
        public int IdMarca { get; set; }
    }
}