using System.Security.Claims;
using HomeFix.DTOs;
using HomeFix.Model;
using HomeFix.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Controllers;

public class CuentaController : BaseController
{
    private readonly UserManager<Usuario> _userManager;
    private readonly TokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IConfiguration _config;


    public CuentaController(UserManager<Usuario> userManager, TokenService tokenService, IEmailService emailService, IConfiguration config)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _emailService = emailService;
        _config = config;
    }

    /// <summary>
    /// Logueo de usuario
    /// </summary>
    /// <param name="loginDto">Email y Contraseña del usuario a loguear</param>
    /// <returns>Confirmacion de logueo + Token necesaria para operaciones de la API</returns>
    
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
    
    /// <summary>
    /// Recuperacion de contraseña
    /// </summary>
    /// <param name="forgotPasswordDto">Email del usuario a recuperar contraseña</param>
    /// <returns>Confirmacion de recuperacion de contraseña + email al correo del usuario</returns>

    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordDto forgotPasswordDto)
    {
        Console.WriteLine(forgotPasswordDto.Email);
        var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
        

        if (user != null)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var baseUrl = _config.GetSection("ClientUrl").Value;
            var url = $"{baseUrl}/reset?email={user.Email}&token={token}";
            
            var request = new EmailDto
            {
                To = user.Email,
                Subject = "Recuperar contraseña",
                Body = $"Por favor ingrese al siguiente link para recuperar la contraseña. <a href={url}>Click aqui</a>"
            };
            
            _emailService.SendEmail(request);
         
            return StatusCode(StatusCodes.Status200OK, "Envio de email para recuperar contraseña enviado. Por favor verifique su direccion de email.");
        }

        return StatusCode(StatusCodes.Status400BadRequest);
    }
    
    /// <summary>
    /// Reemplazar contraseña
    /// </summary>
    /// <param name="resetPassword">DTO de datos necesarios para cambiar la contraseña</param>
    /// <returns>Confirmacion de cambio de contraseña</returns>
    
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
    //
    // [HttpGet("reset-password")]
    // public async Task<IActionResult> ResetPassword(string token, string email)
    // {
    //     var user = new ResetPassword {Token = token, Email = email};
    //
    //     return Ok(new
    //     {
    //         user
    //     });
    // }
    
    
    
    //Los siguientes metodos son de desarrollo.
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
           
        };
        var result = await _userManager.CreateAsync(usuario, registroDto.Password);
        
        if (result.Succeeded)
        {
            await _userManager.AddClaimAsync(usuario, new Claim(ClaimTypes.Role, registroDto.Rol));
            return new UsuarioDto
            {
                UserName = usuario.UserName,
                Token =  await _tokenService.GenerateToken(usuario),
                ImagenPerfil = usuario.ImagenPerfil,
            };
        }
        return BadRequest("Problema en el registro");
    }
    [HttpPost("test")]
    public  IActionResult TestEmail(EmailDto request)
    {
        _emailService.SendEmail(request);
        return Ok();
    }
}