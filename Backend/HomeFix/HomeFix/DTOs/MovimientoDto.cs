using HomeFix.Model;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HomeFix.DTOs;

public class MovimientoDtoCreate
{
    public string Descripcion { get; set; }
    
    public List<DetalleMovientoCreateDto> MovimientoDetalles { get; set; } = new List<DetalleMovientoCreateDto>();


}
public class MovimientoDtoUpdate
{
    public int Id { get; set; }
    public string Descripcion { get; set; }

    //public List<DetalleMovientoCreateDto> MovimientoDetalles { get; set; } = new List<DetalleMovientoCreateDto>();
}



public class MovimientoDto
{
    public int Id { get; set; }
    public int UsuarioId { get; set; }
    public DateTime FechaYHora { get; set; }
    public string Descripcion { get; set; }     
    public decimal PrecioTotal { get; set; }
    public UsuarioDto Usuario { get; set; }

    public List<DetalleMovimientoDto> MovimientoDetalles { get; set; } = new List<DetalleMovimientoDto>();


    

}

