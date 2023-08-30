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
        private readonly IFileStorageService _fileStorageService;
        public MovimientoController( HomeFixDbContext homeFixDbContext, IMapper mapper, UserManager<Usuario> userManager)
        {
            _context = homeFixDbContext;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<MovimientoDto>>> GetMovimientosAsync()
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
            if(movimiento is null)
                return NotFound();
            return Ok(_mapper.Map<MovimientoDto>(movimiento));
            
        }

        [HttpPost]
        public async Task<ActionResult<int>> MovientoInsertAsync(MovimientoDtoCreate movimiento)
        {
            
            if(movimiento is null)
                return BadRequest();

            var movimientoEntity = _mapper.Map<Movimiento>(movimiento);
            Usuario usuario =  await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (usuario is null)
            {
                //return BadRequest();
                
            }
            //movimientoEntity.UsuarioId = usuario.Id;
            movimientoEntity.UsuarioId = 1;
            movimientoEntity.FechaYHora = DateTime.Now.ToUniversalTime();
            _context.Add(movimientoEntity);
            await _context.SaveChangesAsync();
            return Ok(movimientoEntity.Id);



        }



        
        

    }
}
