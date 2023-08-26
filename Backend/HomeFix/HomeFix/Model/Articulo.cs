using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeFix.Model
{
    public class Articulo
    {
        public int Id { get; set; }
        [Required] [MaxLength(50)] 
        public string Nombre { get; set; }
        [Required] [MaxLength(500)] 
        public string Descripcion { get; set; }
        public List<Imagen> Imagenes { get; set; } = new List<Imagen>();

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public int CantidadMinima { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Costo { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Peso { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Alto { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Ancho { get; set; }



        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
        
        public int MarcaId { get; set; }
        public Marca Marca { get; set; }
        
    }
}