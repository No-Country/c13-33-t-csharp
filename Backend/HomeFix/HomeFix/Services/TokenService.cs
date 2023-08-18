using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HomeFix.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace HomeFix.Services;

public class TokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<Usuario> _userManager;
    
    public TokenService(UserManager<Usuario> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<string> GenerateToken(Usuario usuario)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, usuario.Email),
            new Claim(ClaimTypes.Name, usuario.UserName),
            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString())
        };

        var roles = await _userManager.GetRolesAsync(usuario);
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenKey"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var tokenOptions = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
            expires: DateTime.Now.AddDays(30), signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
    }
}