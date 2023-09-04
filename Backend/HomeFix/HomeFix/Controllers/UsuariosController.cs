using AutoMapper;
using HomeFix.DTOs;
using HomeFix.Interfaces;
using HomeFix.Model;
using Microsoft.AspNetCore.Mvc;

namespace HomeFix.Controllers;

public class UsuariosController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public UsuariosController(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<List<UsuariosDto>> GetUsuarios()
    {
        var usuarios =  await _uow.UsuariosRepository.GetAllUsers();
        return _mapper.Map<List<UsuariosDto>>(usuarios);
    }
}