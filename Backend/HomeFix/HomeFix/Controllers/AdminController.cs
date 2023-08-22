using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;

[ApiController]
[Route("api/[controller]")] 
public class AdminController : ControllerBase
{
    private readonly UserManager<Usuario> _userManager;

    public AdminController(UserManager<Usuario> userManager)
    {
        _userManager = userManager;
    }
    
    [Authorize(Roles = "Admin")]
    [HttpPost("register")]
    public async Task<IActionResult> Registro(RegistroDto registroDto)
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
            Email = registroDto.Email,
            ImagenPerfil = registroDto.ImagenPerfil
        };
        var result = await _userManager.CreateAsync(usuario, registroDto.Password);
        
        if (!result.Succeeded)
        {
            return BadRequest("Problema en el registro");
        }

        var roleResult = await _userManager.AddToRoleAsync(usuario, "Member");

        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        return Ok("Usuario creado correctamente");

    }
    
    [HttpPost("set-role")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> AsignRole(RolUpdateDto editRoleDto)
    {
        
        var user = await _userManager.FindByNameAsync(editRoleDto.UserName);
        if (user == null)
        {
            return NotFound();
        }

        var userRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, userRoles);
        
        var roleResult = await _userManager.AddToRoleAsync(user, editRoleDto.Rol);

        if (!roleResult.Succeeded)
        {
            return BadRequest("Error asignando el rol");
        }
        
        return Ok("Rol cambiado correctamente");
    }
    
    [HttpPost("remove-roles")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> RemoveRole(RolUpdateDto editRoleDto)
    {
        var user = await _userManager.FindByNameAsync(editRoleDto.UserName);
        if (user == null)
        {
            return NotFound();
        }

        var userRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, userRoles);
        return Ok("Roles removidos con exito");
    }
}