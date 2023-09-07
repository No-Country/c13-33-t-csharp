namespace HomeFix.DTOs;

public class ArticuloPorMes
{
    public DateTime fecha { get; set; }
    public int ArticuloId { get; set; }
    public string Nombre { get; set; }
    public int cantidad { get; set; }
    public double monto { get; set; }
}