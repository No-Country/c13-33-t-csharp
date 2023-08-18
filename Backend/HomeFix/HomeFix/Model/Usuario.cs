using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Model
{
    public class Usuario : IdentityUser<int>
    {
        [MaxLength(150)]
        public string Nombre { get; set; }

        [MaxLength(150)]
        public string Apellido { get; set; }
    }
}