using HomeFix.Model;

namespace HomeFix.DTOs;

public class UsuariosConRolesDto
{
    public IList<UsuariosDto> Usuarios { get; set; }
    public string Rol { get; set; }
}