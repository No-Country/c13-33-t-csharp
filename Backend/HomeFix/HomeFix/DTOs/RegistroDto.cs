namespace HomeFix.DTOs;

public class RegistroDto : LoginDto
{
    public string UserName { get; set; }
    public string Nombre { get; set; }
    public string Apellido { get; set; }

    public string Rol { get; set; } = "Trabajador";
}