using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class MovimientoDetalle
    {
        public int Id { get; set; }

        ///Debatir si hacer objeto anidado, o solo referencia por ID

        [Required]
        public int IdProducto { get; set; }

        [Required]
        public int IdMovimiento { get; set; }

        [Required]
        public int Cantidad { get; set; }

        [Required]
        public float PrecioUnitario { get; set; }

    }
}
