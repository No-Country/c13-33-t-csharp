using HomeFix.DTOs;
using HomeFix.Model;

namespace HomeFix.Interfaces;

public interface IArticulosRepository
{
    Task<List<Articulo>> GetAllArticulos();
    
    Task<ArticuloDto> FindProjectedArticuloByIdAsync(int id);

    Task<Articulo> FindArticuloById(int id);

    Task<Articulo> FindArticuloWithLastUserById(int id);
    ArticuloDto FindProjectedArticuloById(int id);
    
    void AddArticulo(Articulo articulo);
}