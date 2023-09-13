namespace HomeFix.DTOs;

public class ArticuloMasVendidoFunctionDto
{
    public DateTime fecha { get; set; }
    public int articuloId { get; set; }
    public string nombre { get; set; }
    public int cantidad { get; set; }
    public double total { get; set; }
    public double precio { get; set; }
}