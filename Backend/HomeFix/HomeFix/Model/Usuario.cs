using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Model
{
    public class Usuario : IdentityUser<int>
    {

        [MaxLength(150)]
        public string Nombre { get; set; }

        [MaxLength(300)]
        public string ImagenPerfil { get; set; }
        
        [MaxLength(150)]
        public string Apellido { get; set; }

        public List<Movimiento> Movimientos { get; set;}
    }
}