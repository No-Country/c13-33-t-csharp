using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class DetalleMovimientoController : BaseController
{
    private readonly HomeFixDbContext _context;
    public DetalleMovimientoController( HomeFixDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Elimina un detalle movimiento de la db y revierte cambios a datos relacionados
    /// </summary>
    /// <param name="id">Id del movimientoDetalle a eliminar</param>
    /// <returns>Confirmacion de eliminacion</returns>
    
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        var detalle = await _context.MovimientosDetalle.FirstOrDefaultAsync (x => x.Id == id);
        if (detalle == null)
        {
            return NotFound();
        }
        try
        {
            var articulo = await _context.Articulo.FirstOrDefaultAsync(x => x.Id == detalle.ArticuloId);
            articulo.Cantidad += detalle.Cantidad;
            _context.Articulo.Update(articulo);

            var movimiento = await _context.Movimientos.FirstOrDefaultAsync(x => x.Id == detalle.MovimientoId);
            movimiento.PrecioTotal -= (decimal)(detalle.PrecioUnitario * detalle.Cantidad);
            _context.Movimientos.Update(movimiento);

        _context.MovimientosDetalle.Remove(detalle);
        await _context.SaveChangesAsync();
        }catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok();
    }

    /// <summary>
    /// Inserta un movimientoDetalle dentro de la db y modifica datos relacionados a este
    /// </summary>
    /// <param name="detalle">movimientoDetalle a registrar</param>
    /// <returns>Confirmacion de registro</returns>
    
    [HttpPost]
    public async Task<ActionResult<int>> InsertDetalleMovimiento(DetalleMovimientoDto detalle)
    {
        var articulo = await _context.Articulo.FirstOrDefaultAsync(x => x.Id == detalle.ArticuloId);
        if (articulo == null)
        {
            return NotFound();
        }
        if (articulo.Cantidad < detalle.Cantidad)
        {
            return BadRequest("No hay suficiente cantidad de articulos");
        }
        try
        {
            articulo.Cantidad -= detalle.Cantidad;
            _context.Articulo.Update(articulo);

            var movimiento = await _context.Movimientos.FirstOrDefaultAsync(x => x.Id == detalle.MovimientoId);
            if (movimiento == null)
            {
                return NotFound();
            }
            movimiento.PrecioTotal += (decimal)(detalle.PrecioUnitario * detalle.Cantidad);
            _context.Movimientos.Update(movimiento);

            var detalleMovimiento = new MovimientoDetalle
            {
                ArticuloId = detalle.ArticuloId,
                Cantidad = detalle.Cantidad,
                PrecioUnitario = (float)articulo.Precio,
                MovimientoId = detalle.MovimientoId
            };
            _context.MovimientosDetalle.Add(detalleMovimiento);
            await _context.SaveChangesAsync();
            return Ok(detalleMovimiento.Id);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    /// <summary>
    /// Edita un detalleMovimiento de la base de datos y sus datos relacionados
    /// </summary>
    /// <param name="detalle">Detalle a editar</param>
    /// <returns>Confirmacion de edicion</returns>
    
    [HttpPut]
    public async Task<ActionResult<int>> EditDetalleMovimiento(DetalleMovimientoDto detalle)
    {
        if(detalle.Id == 0)
        {
            return BadRequest("El id del detalle no puede ser 0");
        }
        var detalleMovimiento = await _context.MovimientosDetalle.FirstOrDefaultAsync(x => x.Id == detalle.Id);
        if (detalleMovimiento == null)
        {
            return NotFound();
        }
        var articulo = await _context.Articulo.FirstOrDefaultAsync(x => x.Id == detalle.ArticuloId);
        if (articulo == null)
        {
            return NotFound();
        }
        if (articulo.Cantidad < (detalle.Cantidad - detalleMovimiento.Cantidad))
        {
            return BadRequest("No hay suficiente cantidad de articulos");
        }
        try
        {
            articulo.Cantidad -= detalle.Cantidad + detalleMovimiento.Cantidad;
            _context.Articulo.Update(articulo);

            var movimiento = await _context.Movimientos.FirstOrDefaultAsync(x => x.Id == detalle.MovimientoId);
            if (movimiento == null)
            {
                return NotFound();
            }
            movimiento.PrecioTotal += (decimal)(detalle.PrecioUnitario * detalle.Cantidad - detalleMovimiento.PrecioUnitario * detalleMovimiento.Cantidad);
            _context.Movimientos.Update(movimiento);
            //Mirar logica si solamente cambia la cantidad de articulos o cambia el producto(Si cambia el producto hay que modificarla) 
            detalleMovimiento.ArticuloId = detalle.ArticuloId;
            detalleMovimiento.Cantidad = detalle.Cantidad;
            detalleMovimiento.PrecioUnitario = (float)articulo.Precio;
            detalleMovimiento.MovimientoId = detalle.MovimientoId;
            _context.MovimientosDetalle.Update(detalleMovimiento);
            await _context.SaveChangesAsync();
            return Ok(detalleMovimiento.Id);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }





}
