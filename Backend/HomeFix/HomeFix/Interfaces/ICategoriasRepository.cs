using HomeFix.Model;

namespace HomeFix.Interfaces;

public interface ICategoriasRepository
{
    Task<List<Categoria>> GetAllCategorias();
    
    Task<Categoria> FindCategoriaById(int id);

    void AddCategoria(Categoria marca);

    void RemoveCategoria(Categoria marca);
}