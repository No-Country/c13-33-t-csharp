using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using Microsoft.AspNetCore.Mvc;

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



        //[HttpGet("ArticuloMasVendido")]
        //public async Task<ActionResult<List<ArticuloMasVendidoDto>>> GetArticuloMasVendido()
        //{
        //    //var articulos = await _context.ArticulosMasVendidosPorMes.ToListAsync();
        //    return _mapper.Map<List<ArticuloMasVendidoDto>>(articulos);
        //}

    }
}
