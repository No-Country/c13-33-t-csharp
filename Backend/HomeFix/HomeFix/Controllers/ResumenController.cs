using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Migrations;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers
{
    public class ResumenController : BaseController
    {
        private readonly HomeFixDbContext _context;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;


        public ResumenController(HomeFixDbContext context, IMapper mapper, IUnitOfWork uow)
        {
            _context = context;
            _mapper = mapper;
            _uow = uow;
        }


        [HttpGet("articulosporfecha")]
        public async Task<List<ArticuloPorMesDto>> GetArt(int month, int year)
        {
            if (year == 0) year = DateTime.Now.Year;
            if (month == 0) month = DateTime.Now.Month;
            var result = await _context.MovimientosDetalle
                .Include(x => x.Movimiento)
                .Include(x => x.Articulo)
                .Where(x => x.Movimiento.FechaYHora.Month == month && x.Movimiento.FechaYHora.Year == year)
                .GroupBy(x => x.ArticuloId)
                .ToListAsync();
            
            var articulosPorMes = new List<ArticuloPorMesDto>();
            foreach (var articulo in result)
            {
                var cant = 0;
                var nombreArticulo = "";
                var precioUnitario = 0.0;
                var articuloId = 0;
                var imagen = "";
                
                foreach (var item in articulo)
                {
                    cant += item.Cantidad;
                    nombreArticulo = item.Articulo.Nombre;
                    articuloId = item.ArticuloId;
                    precioUnitario = item.PrecioUnitario;
                    imagen = item.Articulo.Imagen;
                }
                
                var articuloPorMes = new ArticuloPorMesDto
                {
                    cantidad = cant,
                    Nombre = nombreArticulo,
                    mes    = month,
                    anio = year,
                    total = cant * precioUnitario,
                    precio_unitario = precioUnitario,
                    ArticuloId = articuloId,
                    imagen = imagen
                };
                articulosPorMes.Add(articuloPorMes);
            }

            return articulosPorMes;
        }

        [HttpGet("MasVendidosPorMes")]
        public async Task<ActionResult<List<ArticuloPorMesDto>>> GetArticulosPorMes()
        {
            try
            {
                var articulos = await _context.Set<ArticuloPorMesDto>().ToListAsync();
                return Ok(articulos);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return BadRequest();
        }

        /// <summary>
        /// Devuelve el articulo con mas ventas en la base de datos
        /// </summary>
        /// <returns>DTO con la informacion del articulo mas vendido</returns>
        [HttpGet("ArticuloMasVendido")]
        public async Task<ActionResult<List<ArticuloMasVendidoDto>>> GetArticuloMasVendido()
        {
            try
            {
                var articulos = await _context.Set<ArticuloMasVendidoDto>().ToListAsync();
                return Ok(articulos);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return BadRequest();
        }

        /// <summary>
        /// Retorna las ventas de los ultimos 6 meses
        /// </summary>
        /// <returns>DTO con la cantidad de ventas de los ultimos 6 meses</returns>
        [HttpGet("VentasUltimos6Meses")]
        public async Task<ActionResult<List<VentasPorMes>>> GetVentasPorMes()
        {
            try
            {
                return Ok(await _context.Set<VentasPorMes>().ToListAsync());
            }
            catch (Exception e)
            {
            }

            return BadRequest();
        }

        /// <summary>
        /// Retorna las ventas del ultimo mes
        /// </summary>
        /// <returns>DTO con la cantidad de ventas del ultimo mes</returns>
        [HttpGet("VentaMes")]
        public async Task<ActionResult<VentaMes>> GetVentasMes()
        {
            try
            {
                var result = await _context.Set<VentaMes>().ToListAsync();
                return Ok(result.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}