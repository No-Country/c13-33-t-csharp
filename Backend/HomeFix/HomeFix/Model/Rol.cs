using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Rol
    {
        
        public int Id { get; set; }
        [MaxLength(50)]
        public string Nombre { get; set; }
        [MaxLength(150)]
        public string Descripcion { get; set; }
    }
}
