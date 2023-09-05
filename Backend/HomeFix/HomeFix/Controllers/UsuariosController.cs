using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class UsuariosController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;
    private readonly UserManager<Usuario> _userManager;
    private readonly HomeFixDbContext _context;

    public UsuariosController(IUnitOfWork uow, IMapper mapper, UserManager<Usuario> userManager, HomeFixDbContext context)
    {
        _uow = uow;
        _mapper = mapper;
        _userManager = userManager;
        _context = context;
    }
    
    [HttpGet]
    public async Task<List<UsuariosConRolesDto>> GetUsuarios()
    {
        var usuariosconRoles = new List<UsuariosConRolesDto>();
        var roles = await _context.Roles.ToListAsync();
        
        foreach (var rol in roles)
        {
            var user = await _userManager.GetUsersInRoleAsync(rol.Name);
            var usersDto = _mapper.Map<List<UsuariosDto>>(user);
            var userConRol = new UsuariosConRolesDto
            {
                Usuarios = usersDto,
                Rol = rol.Name
            };
            usuariosconRoles.Add(userConRol);
        }
        
        
        return  usuariosconRoles;
    }
}