using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Usuario
    {
        public int Id { get; set; } 
        public int IdRol { get; set;}
        [MaxLength(150)]
        [Required]
        public string UserName { get; set; }
        [MaxLength(150)]
        [Required]
        public string Password { get; set; }
        [MaxLength(150)]
        public string Nombre { get; set; }
        [MaxLength(150)]
        [Required]
        public string Email { get; set; }
        [MaxLength(150)]
        public string Apellido { get; set; }



    }
}
