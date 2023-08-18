using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace HomeFix.Model
{
    public class Rol: IdentityRole<int>
    {
        
        [MaxLength(150)]
        public string Descripcion { get; set; }
    }
}
