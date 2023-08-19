using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Usuario
    {
        public int Id { get; set; }
        [Required]
        public int IdRol { get; set;}
        [MaxLength(150)]
        [Required]
        public string UserName { get; set; }
        [MaxLength(150)]
        [Required]
        public string Contrasena { get; set; }

        [MaxLength(150)]
        [Required]
        public string Email { get; set; }
        [MaxLength(300)]
        public string ImagenPerfil { get; set; }
        public string Nombre { get; set; }
        [MaxLength(150)]
        public string Apellido { get; set; }



    }
}
