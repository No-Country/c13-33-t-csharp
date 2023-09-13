namespace HomeFix.DTOs;

public class UsuarioDto
{
    public string UserName { get; set; }
    public string Token { get; set; }
    public string ImagenPerfil { get; set; }
    
    public IList<string> Roles { get; set; }
}