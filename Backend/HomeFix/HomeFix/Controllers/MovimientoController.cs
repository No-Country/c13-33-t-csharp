using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services.FileStorage;
using MailKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client.Extensions.Msal;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace HomeFix.Controllers
{
    public class MovimientoController : BaseController
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly HomeFixDbContext _context;
        private readonly IMapper _mapper;

        public MovimientoController(HomeFixDbContext homeFixDbContext, IMapper mapper, UserManager<Usuario> userManager)
        {
            _context = homeFixDbContext;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<MovimientoDto>>> GetMovimientosAllAsync()
        {
            var movimientos = await _context.Movimientos.Include(x => x.MovimientoDetalles).Include(x => x.Usuario).ToListAsync();
            return Ok(_mapper.Map<List<MovimientoDto>>(movimientos));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MovimientoDto>> GetMovimientoByIdAsync(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var movimiento = await _context.Movimientos.Include(x => x.MovimientoDetalles).Include(x => x.Usuario).FirstOrDefaultAsync(x => x.Id == id);
            if (movimiento is null)
                return NotFound();
            return Ok(_mapper.Map<MovimientoDto>(movimiento));

        }

        [HttpPost]
        public async Task<ActionResult<int>> MovientoInsertAsync(MovimientoDtoCreate movimiento)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {

                if (movimiento is null)
                    return BadRequest();

                List<MovimientoDetalle> detallesEntity = new List<MovimientoDetalle>();
                //Agregamos el movimiento
                var movimientoEntity = _mapper.Map<Movimiento>(movimiento);
                Usuario usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
                if (usuario is null)
                {
                    //return BadRequest();

                }
                //movimientoEntity.UsuarioId = usuario.Id;
                movimientoEntity.UsuarioId = 1;
                movimientoEntity.FechaYHora = DateTime.Now.ToUniversalTime();


                if (movimientoEntity.MovimientoDetalles is not null)
                {
                    //Guardamos los detalles del movimiento
                    detallesEntity = movimientoEntity.MovimientoDetalles.ToList();
                    movimientoEntity.MovimientoDetalles = null;
                }

                _context.Movimientos.Add(movimientoEntity);
                await _context.SaveChangesAsync();

                if (detallesEntity.Count() != 0)
                {
                    for (int i = 0; i < detallesEntity.Count; i++)
                    {
                        detallesEntity[i].MovimientoId = movimientoEntity.Id;
                        var articulo = await _context.Articulo.FirstOrDefaultAsync(x => x.Id == detallesEntity[i].ArticuloId);
                        if (articulo is null)
                        {
                            return BadRequest($"No existe el articlo con Id: {detallesEntity[i].ArticuloId}");
                        }
                        if (detallesEntity[i].Cantidad > articulo.Cantidad)
                        {
                            return BadRequest($"No hay suficiente cantidad de articulos con Id: {detallesEntity[i].ArticuloId}");
                        }
                        articulo.Cantidad -= detallesEntity[i].Cantidad;
                        _context.Articulo.Update(articulo);
                        detallesEntity[i].PrecioUnitario = (float)articulo.Precio;
                    }
                    _context.MovimientosDetalle.AddRange(detallesEntity);
                    await _context.SaveChangesAsync();
                }
                var count = movimientoEntity.MovimientoDetalles.Select(x => x.Cantidad * x.PrecioUnitario).Sum();
                movimientoEntity.PrecioTotal = (decimal)count;
                _context.Movimientos.Update(movimientoEntity);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return Ok(movimientoEntity.Id);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> MovimientoDelete(int id)
        {
            if (id <= 0)
                return BadRequest();
            var movimiento = await _context.Movimientos.Include(x => x.MovimientoDetalles).FirstOrDefaultAsync(x => x.Id == id);
            if (movimiento is null)
                return NotFound();

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                List<MovimientoDetalle> detalles = await _context.MovimientosDetalle.Where(x => x.MovimientoId == id).ToListAsync();
                foreach (var detalle in detalles)
                {
                    var articulo = await _context.Articulo.FirstOrDefaultAsync(x => x.Id == detalle.ArticuloId);
                    if (articulo is null)
                    {
                        return BadRequest($"No existe el articlo con Id: {detalle.ArticuloId}");
                    }
                    articulo.Cantidad += detalle.Cantidad;
                    _context.Articulo.Update(articulo);
                }


                foreach (var detalle in detalles)
                {
                    _context.MovimientosDetalle.Remove(detalle);
                }
                await _context.SaveChangesAsync();
                _context.Movimientos.Remove(movimiento);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch (Exception e)
            {
                return BadRequest();
            }
            return Ok();
        }


        [HttpPut]
        public async Task<ActionResult> MovimientoUpdateAsync(MovimientoDtoUpdate movimiento)
        {
            var result = await _context.Movimientos.FirstOrDefaultAsync(x => x.Id == movimiento.Id);
            if (result is null)
                return NotFound("No se encontro el movimiento");

            result.FechaYHora = DateTime.Now.ToUniversalTime();
            var usuario = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            result.UsuarioId = usuario.Id;
            movimiento.Descripcion = movimiento.Descripcion;
            await _context.SaveChangesAsync();
            return Ok();
        }




    }
}
