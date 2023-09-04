using HomeFix.Model;

namespace HomeFix.Interfaces;

public interface IUsuariosRepository
{
    Task<List<Usuario>> GetAllUsers();
}