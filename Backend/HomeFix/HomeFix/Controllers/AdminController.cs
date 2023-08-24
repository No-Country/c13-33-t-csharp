using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;


public class AdminController : BaseController
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
            
        };
        var result = await _userManager.CreateAsync(usuario, registroDto.Password);
        
        if (!result.Succeeded)
        {
            return BadRequest("Problema en el registro");
        }

        var roleResult = await _userManager.AddToRoleAsync(usuario,  registroDto.Rol);

        if (!roleResult.Succeeded)
        {
            return BadRequest(roleResult.Errors);
        }

        return Ok("Usuario creado correctamente");

    }
    
    //Devuelve los roles del usuario que es pasado por query.
    [Authorize(Roles = "Admin")]
    [HttpGet("user-roles/{username}")]
    public async Task<ActionResult> GetUserRoles(string username)
    {
        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
        {
            return NotFound();
        }

        var userRoles = await _userManager.GetRolesAsync(user);
           

        return Ok(userRoles);
    }
    
    //No tener en cuenta, proximo eliminacion/cambiar
    //Setea diversos roles. Ej de la url: /set-role/Usuario?roles=Member,Admin Para agregar esos dos roles al usuario
    [HttpPost("set-roles/{username}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> AsignRoles(string username, [FromQuery] string roles)
    {
        if (string.IsNullOrEmpty(roles))
            return BadRequest("Debe haber por lo menos un rol");
        
        var selectedRoles = roles.Split(",").ToArray();

        var user = await _userManager.FindByNameAsync(username);
        if (user == null)
        {
            return NotFound();
        }

        var userRoles = await _userManager.GetRolesAsync(user);
        
        var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

        if (!result.Succeeded)
        {
            return BadRequest("Error asignando el rol");
        }
        
        return Ok(await _userManager.GetRolesAsync(user));
    }
    
    //Quita todos los roles al usuario.
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