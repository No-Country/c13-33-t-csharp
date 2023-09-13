namespace HomeFix.DTOs;

public class ArticuloPorMesDto
{
    public int mes { get; set; }
    public int anio { get; set; }
    public int ArticuloId { get; set; }
    public string Nombre { get; set; }
    public int cantidad { get; set; }
    public double total { get; set; }
    public double precio_unitario { get; set; }
    public string imagen { get; set; }
}