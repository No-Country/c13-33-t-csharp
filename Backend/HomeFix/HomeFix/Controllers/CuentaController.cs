using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Azure;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    private readonly IEmailService _emailService;


    public CuentaController(UserManager<Usuario> userManager, TokenService tokenService, IEmailService emailService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _emailService = emailService;
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
                ImagenPerfil = usuario.ImagenPerfil,
                Token =  await _tokenService.GenerateToken(usuario),
            };
        }

        return Unauthorized();
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

    //El siguiente metodo es de desarrollo solamente para poder crear usuarios sin necesidad de ser un administrador.
    [AllowAnonymous]
    [HttpPost("signup")]
    public async Task<ActionResult<UsuarioDto>> SignUp(RegistroDto registroDto)
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
        
        if (result.Succeeded)
        {
            await _userManager.AddClaimAsync(usuario, new Claim(ClaimTypes.Role, "Member"));
            return new UsuarioDto
            {
                UserName = usuario.UserName,
                Token =  await _tokenService.GenerateToken(usuario),
                ImagenPerfil = usuario.ImagenPerfil,
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
            ImagenPerfil = usuario.ImagenPerfil,
            Token =  await _tokenService.GenerateToken(usuario),
        };
    }

    [HttpGet("test")]
    public  IActionResult TestEmail()
    {
        var message = new Message(new[] {"matias.lioneldamico@gmail.com"}, "Test", "<h1>Testing</h1>");
        
        
        _emailService.SendEmail(message);
        return StatusCode(StatusCodes.Status200OK, "Email sent successfully");
    }

    
    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
    {
        Console.WriteLine(forgotPasswordDto.Email);
        var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
        if (user != null)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var link = Url.Action(nameof(ResetPassword), "Cuenta", new {token, email = user.Email}, Request.Scheme);
            var message = new Message(new[] {user.Email}, "Recuperar contraseña", link);
        
        
            _emailService.SendEmail(message);
            return StatusCode(StatusCodes.Status200OK, "Envio de email para recuperar contraseña enviado. Por favor verifique su direccion de email.");
        }

        return StatusCode(StatusCodes.Status400BadRequest);
    }

    [HttpGet("reset-password")]
    public async Task<IActionResult> ResetPassword(string token, string email)
    {
        var user = new ResetPassword {Token = token, Email = email};

        return Ok(new
        {
            user
        });
    }
    
    
    [AllowAnonymous]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
    {
        var user = await _userManager.FindByEmailAsync(resetPassword.Email);
        if (user != null)
        {
            var resetPasswordResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
            if (!resetPasswordResult.Succeeded)
            {
                foreach (var error in resetPasswordResult.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return Ok(ModelState);
            }
            return StatusCode(StatusCodes.Status200OK, "La contraseña se ha modificado correctamente");
        }

        return StatusCode(StatusCodes.Status400BadRequest);
    }
    
    [HttpPost("set-role")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
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