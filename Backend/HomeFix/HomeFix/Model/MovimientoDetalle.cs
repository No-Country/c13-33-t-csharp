using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class MovimientoDetalle
    {
        public int Id { get; set; }

        

        [Required]
        public int ProductoId { get; set; }

        [Required]
        public int MovimientoId { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public float PrecioUnitario { get; set; }

        public Articulo Articulo { get; set; }
        public Movimiento Movimiento { get; set; }
    }
}
