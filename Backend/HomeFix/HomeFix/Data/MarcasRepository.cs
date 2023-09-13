using AutoMapper;
using HomeFix.Dbcontext;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.EntityFrameworkCore;

namespace HomeFix.Data;


public class MarcasRepository : IMarcasRepository
{
    private readonly HomeFixDbContext _context;

    public MarcasRepository(HomeFixDbContext context)
    {
        _context = context;
    }
    public async Task<List<Marca>> GetAllMarcas()
    {
        return await _context.Marcas.ToListAsync();
    }

    public async Task<Marca> FindMarcaById(int id)
    {
        return await _context.Marcas.FindAsync(id);
    }

    public void AddMarca(Marca marca)
    {
        _context.Marcas.Add(marca);
    }

    public void RemoveMarca(Marca marca)
    {
        _context.Marcas.Remove(marca);
    }
}