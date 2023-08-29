using System.ComponentModel.DataAnnotations;

namespace HomeFix.DTOs;

public class UpdateArticuloDto
{

    public string Nombre { get; set; }
    
    
    public string Descripcion { get; set; }
    
   
    public int Cantidad { get; set; }

    public int CantidadMinima { get; set; }

    
    public decimal Costo { get; set; }
    

    public decimal Peso { get; set; }
        
 
    public decimal Alto { get; set; }
        
  
    public decimal Ancho { get; set; }
        
   
    public IFormFile Imagen { get; set; }
    public int MarcaId { get; set; }
    
    public int CategoriaId { get; set; }


}