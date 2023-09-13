using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services.FileStorage;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace HomeFix.Services
{
    public interface IMovimientoService
    {

    }
    public class MovimientoService : IMovimientoService
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly HomeFixDbContext _context;
        private readonly IMapper _mapper;
        
        
        public MovimientoService(HomeFixDbContext context, UserManager<Usuario> userManager, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<int> InsertMovimientoAsync(MovimientoDto movimiento, ClaimsPrincipal user)
        {
            //TODO: CUANDO TERMINE TODO LO ANTERIOR RECIEN HACER ESTO

            var movimientoEntity = _mapper.Map<Movimiento>(movimiento);
            Usuario usuario = await _userManager.FindByIdAsync(user.FindFirstValue(ClaimTypes.NameIdentifier));
            if (usuario is null)
            {
                throw new Exception("Usuario no encontrado");

            }
            movimientoEntity.UsuarioId = usuario.Id;
            //movimientoEntity.UsuarioId = 1;
            movimientoEntity.FechaYHora = DateTime.Now.ToUniversalTime();

            return 0;
        }
    }
}
