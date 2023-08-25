using Microsoft.EntityFrameworkCore.Metadata.Internal;
using NpgsqlTypes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HomeFix.Model
{
    public class Movimiento
    {
        public int Id { get; set; }
        [Required] public int UsuarioId { get; set; }
        [Required] public DateTime FechaYHora { get; set; }
        public string Descripcion { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")] 
        public decimal PrecioTotal { get; set; } 
        
        public Usuario Usuario { get; set; }
    }
}
