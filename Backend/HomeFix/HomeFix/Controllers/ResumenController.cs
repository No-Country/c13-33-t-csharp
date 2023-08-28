using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers
{
  
    public class ResumenController : BaseController
    {
        private readonly HomeFixDbContext _context;
        private readonly IMapper _mapper;


        public ResumenController(HomeFixDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }



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
