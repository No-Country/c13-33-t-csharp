using System.ComponentModel.DataAnnotations;

namespace HomeFix.Model
{
    public class Imagen
    {
        public int Id { get; set; }
        [Required]
        public int IdArticulo { get; set; }
        [Required]
        ///Tenemos que ver si para la imagen redirigimos a
        ///una ubicacion en el disco, o si realizamos un objeto
        ///formato imagen
        ///Yo de momento lo dejo en formato string, pero
        ///si despues modifican no hay drama -Martin
        public string Ubicacion { get; set; }
    }
}
