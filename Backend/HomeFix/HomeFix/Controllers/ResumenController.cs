using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
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
            }catch(Exception e)
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
            }catch(Exception e)
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
