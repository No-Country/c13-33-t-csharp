using System.Security.Claims;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

[ApiController]
[Route("api/[controller]")] // ruta para llegar al controller: api/cuenta
public class CuentaController : ControllerBase
{
    private readonly UserManager<Usuario> _userManager;
    private readonly TokenService _tokenService;
    

    public CuentaController(UserManager<Usuario> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UsuarioDto>> Login(LoginDto loginDto)
    {
        var usuario = await _userManager.FindByEmailAsync(loginDto.Email);
        if (usuario == null) return Unauthorized();

        var result = await _userManager.CheckPasswordAsync(usuario, loginDto.Password);

        if (result)
        {
            return new UsuarioDto
            {
                UserName = usuario.UserName,
                Token =  await _tokenService.GenerateToken(usuario),
            };
        }

        return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("registro")]
    public async Task<ActionResult<UsuarioDto>> Registro(RegistroDto registroDto)
    {
        if (await _userManager.Users.AnyAsync(usuario => usuario.UserName == registroDto.UserName))
        {
            return BadRequest("Nombre de usuario en uso");
        }
        
        if (await _userManager.Users.AnyAsync(usuario => usuario.Email == registroDto.Email))
        {
            return BadRequest("Email en uso");
        }

        var usuario = new Usuario
        {
            UserName = registroDto.UserName,
            Nombre = registroDto.Nombre,
            Apellido = registroDto.Apellido,
            Email = registroDto.Email
        };
        var result = await _userManager.CreateAsync(usuario, registroDto.Password);
        
        if (result.Succeeded)
        {
            return new UsuarioDto
            {
                UserName = usuario.UserName,
                Token =  await _tokenService.GenerateToken(usuario),
            };
        }
        return BadRequest("Problema en el registro");
    }
    
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UsuarioDto>> GetCurrentUser()
    {
        var usuario = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

        return new UsuarioDto
        {
            UserName = usuario.UserName,
            Token =  await _tokenService.GenerateToken(usuario),
        };
    }

}