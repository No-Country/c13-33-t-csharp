using HomeFix.Model;
using System.ComponentModel.DataAnnotations;

namespace HomeFix.DTOs;

public class DetalleMovientoCreateDto
{
    public int Cantidad { get; set; }
    public int ArticuloId { get; set; }

}
public class DetalleMovimientoDto
{
    public int Id { get; set; }
    public int MovimientoId { get; set; }

    public int Cantidad { get; set; }

    public float PrecioUnitario { get; set; }

    public int ArticuloId { get; set; }
    
    
}
