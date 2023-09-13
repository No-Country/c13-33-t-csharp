using HomeFix.DTOs;
using HomeFix.Model;

namespace HomeFix.Interfaces;

public interface IMarcasRepository
{
    Task<List<Marca>> GetAllMarcas();

    Task<Marca> FindMarcaById(int id);

    void AddMarca(Marca marca);

    void RemoveMarca(Marca marca);
}