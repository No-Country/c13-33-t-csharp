using HomeFix.Model;

namespace HomeFix.DTOs;

public class ArticuloDto
{
    public int Id { get; set; }
    
    public string Nombre { get; set; }
    
    public string Descripcion { get; set; }
    
    public int Cantidad { get; set; }
    
    public int CantidadMinima { get; set; }
    
    public decimal Costo { get; set; }

    public decimal Precio { get; set; }
    
    public decimal Peso { get; set; }
        
 
    public decimal Alto { get; set; }
        
  
    public decimal Ancho { get; set; }
        

    public int MarcaId { get; set; }
    public string Marca { get; set; }
    
    public int CategoriaId { get; set; }
    public string Categoria { get; set; }
    public string Subcategoria { get; set; }
    
    public string UsuarioUltimaModificacion { get; set; }
}