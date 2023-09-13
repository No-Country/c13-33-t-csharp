using HomeFix.DTOs;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Interfaces;

public interface IArticulosRepository
{
    Task<List<ArticuloDto>> GetAllArticulos();
    
    Task<ActionResult<ArticuloDto>> FindProjectedArticuloByIdAsync(int id);

    Task<Articulo> FindArticuloById(int id);

    Task<Articulo> FindArticuloWithLastUserById(int id);
    ArticuloDto FindProjectedArticuloById(int id);
    
    void AddArticulo(Articulo articulo);
}